import React from 'react'
import { shallow } from 'enzyme'
import { PollForm } from '../index'
import { generateTokens } from '../../../utils'

jest.mock('../../../utils')

describe('poll form', () => {
  const defaults = {
    actions: {
      createPoll: jest.fn()
    },
    history: {},
    state: {}
  }

  beforeEach(() => {
    generateTokens.mockClear()
  })

  it('renders error message box', () => {
    const tree = shallow(<PollForm {...defaults} />)
    const error = 'Something went wrong'
    tree.setState({ error })
    expect(tree.find('MessageBox').exists()).toBe(true)
    expect(tree.find('MessageBox').prop('children')).toBe(error)
  })

  describe('basic step', () => {
    const data = { description: 'Valid description', voters: 2 }

    it('renders the basic step when mounted', () => {
      const tree = shallow(<PollForm {...defaults} />)
      expect(tree.find('StepNav').prop('active')).toBe('basic')
      expect(tree.find('BasicStep').exists()).toBe(true)
    })

    it('updates the poll description', () => {
      const tree = shallow(<PollForm {...defaults} />)
      const value = 'new description'
      tree
        .find('BasicStep')
        .simulate('changeDescription', { target: { value } })
      expect(tree.state('data').description).toBe(value)
    })

    it('updates the voters count', () => {
      const tree = shallow(<PollForm {...defaults} />)
      const value = '100'
      tree.find('BasicStep').simulate('changeVoters', { target: { value } })
      expect(tree.state('data').voters).toBe(100)
    })

    it('does not advance to next step without description', () => {
      const tree = shallow(<PollForm {...defaults} />)
      tree.setState({ data: { ...data, description: '' } })
      tree.find('BasicStep').simulate('submit')
      expect(tree.state('error')).toBe('Invalid description!')
    })

    it('does not advance to next step with less than 2 voters', () => {
      const tree = shallow(<PollForm {...defaults} />)
      tree.setState({ data: { ...data, voters: 1 } })
      tree.find('BasicStep').simulate('submit')
      expect(tree.state('error')).toBe('At least 2 voters are needed!')
    })

    it('goes to proposals step', () => {
      const tree = shallow(<PollForm {...defaults} />)
      tree.setState({ data })
      tree.find('BasicStep').simulate('submit')
      expect(tree.state('step')).toBe('proposals')
    })
  })

  describe('proposals step', () => {
    const proposals = ['yes', 'no']

    it('renders the proposals step', () => {
      const tree = shallow(<PollForm {...defaults} />)
      tree.setState({ step: 'proposals' })
      expect(tree.find('StepNav').prop('active')).toBe('proposals')
      expect(tree.find('ProposalStep').exists()).toBe(true)
    })

    it('updates the poll proposals', () => {
      const tree = shallow(<PollForm {...defaults} />)
      tree.setState({ step: 'proposals' })
      tree.find('ProposalStep').simulate('updateProposals', proposals)
      expect(tree.state('data').proposals).toBe(proposals)
    })

    it('does not advance to next step without at least two proposals', () => {
      const tree = shallow(<PollForm {...defaults} />)
      tree.setState({ step: 'proposals', data: { proposals: ['yes'] } })
      tree.find('ProposalStep').simulate('submit')
      expect(tree.state('error')).toBe('At least 2 proposals are needed!')
    })

    it('saves the poll and go to the tokens step', async () => {
      const tokens = ['123', '456', '789']
      generateTokens.mockReturnValue(tokens)
      const promise = Promise.resolve()
      const createPoll = jest.fn().mockReturnValue(promise)
      const tree = shallow(<PollForm {...defaults} actions={{ createPoll }} />)
      const data = { description: 'some poll', voters: 3, proposals }
      tree.setState({ step: 'proposals', data })
      tree.find('ProposalStep').simulate('submit')
      expect(generateTokens.mock.calls[0]).toEqual([data.voters])
      expect(createPoll).toHaveBeenCalledWith(
        data.description,
        data.proposals,
        tokens
      )
      await promise
      expect(tree.state('step')).toBe('tokens')
      expect(tree.state('generatedTokens')).toBe(tokens)
    })
  })

  describe('tokens step', () => {
    const generatedTokens = ['6d5sg67', 'st5dg7a', '1grd312']

    it('renders the tokens step', () => {
      const tree = shallow(<PollForm {...defaults} />)
      tree.setState({ step: 'tokens', generatedTokens })
      expect(tree.find('StepNav').prop('active')).toBe('tokens')
      expect(tree.find('TokenStep').exists()).toBe(true)
      expect(tree.find('TokenStep').prop('tokens')).toBe(generatedTokens)
    })

    it('navigates to poll list', () => {
      const history = { push: jest.fn() }
      const tree = shallow(<PollForm {...defaults} history={history} />)
      tree.setState({ step: 'tokens', generatedTokens })
      tree.find('TokenStep').simulate('navigateToPollList')
      expect(history.push).toHaveBeenCalledWith('/polls')
    })
  })
})
