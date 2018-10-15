import React from 'react'
import { shallow } from 'enzyme'
import { VoteForm } from '../index'

describe('vote form', () => {
  const defaults = {
    actions: {
      castVote: jest.fn(),
      listPolls: jest.fn()
    },
    history: { push: jest.fn() },
    match: {
      params: { id: '1' }
    },
    state: {
      fetchStatus: 'DONE',
      polls: [
        {
          id: 1,
          description: 'Poll 1',
          closed: false,
          proposals: [
            { id: 1, description: 'yes' },
            { id: 2, description: 'no' }
          ]
        }
      ]
    }
  }

  it('renders a loading state if loading', () => {
    const state = { fetchStatus: 'LOADING', polls: [] }
    const tree = shallow(<VoteForm {...defaults} state={state} />)
    expect(tree.find('LoadingIndicator').exists()).toBe(true)
  })

  it('renders error message box', () => {
    const tree = shallow(<VoteForm {...defaults} />)
    const error = 'Something went wrong'
    tree.setState({ error })
    expect(tree.find('MessageBox').exists()).toBe(true)
    expect(tree.find('MessageBox').prop('children')).toBe(error)
  })

  it('renders an error message if poll is missing', () => {
    const state = { fetchStatus: 'DONE', polls: [] }
    const tree = shallow(<VoteForm {...defaults} state={state} />)
    expect(tree.find('MessageBox').exists()).toBe(true)
    expect(tree.find('MessageBox').prop('children')).toBe(
      'Poll not found or closed'
    )
  })

  it('renders an error message if poll is closed', () => {
    const state = {
      fetchStatus: 'DONE',
      polls: [{ ...defaults.state.polls[0], closed: true }]
    }
    const tree = shallow(<VoteForm {...defaults} state={state} />)
    expect(tree.find('MessageBox').exists()).toBe(true)
    expect(tree.find('MessageBox').prop('children')).toBe(
      'Poll not found or closed'
    )
  })

  describe('proposal step', () => {
    const data = {
      proposal: 1,
      token: ''
    }

    it('renders the proposal step', () => {
      const tree = shallow(<VoteForm {...defaults} />)
      tree.setState({ step: 'proposal', data })
      expect(tree.find('ProposalStep').exists()).toBe(true)
      expect(tree.find('ProposalStep').props()).toMatchObject({
        description: defaults.state.polls[0].description,
        proposals: defaults.state.polls[0].proposals,
        selected: tree.state('data').proposal
      })
    })

    it('selects a proposal', () => {
      const tree = shallow(<VoteForm {...defaults} />)
      tree.setState({ step: 'proposal' })
      tree.find('ProposalStep').simulate('select', { target: { value: '1' } })
      expect(tree.state('data').proposal).toBe(1)
    })

    it('shows an error message if no one proposal is selected', () => {
      const tree = shallow(<VoteForm {...defaults} />)
      tree.setState({ step: 'proposal', data: { ...data, proposal: -1 } })
      tree.find('ProposalStep').simulate('submit')
      expect(tree.state('error')).toBe('Select a proposal')
    })

    it('navigates to the next step', () => {
      const tree = shallow(<VoteForm {...defaults} />)
      tree.setState({ step: 'proposal', data })
      tree.find('ProposalStep').simulate('submit')
      expect(tree.state('step')).toBe('token')
    })
  })

  describe('token step', () => {
    const data = {
      proposal: 1,
      token: '71rif383r2g'
    }

    it('renders the token step', () => {
      const tree = shallow(<VoteForm {...defaults} />)
      tree.setState({ step: 'token', data })
      expect(tree.find('TokenStep').exists()).toBe(true)
      expect(tree.find('TokenStep').prop('token')).toBe(data.token)
    })

    it('changes the token', () => {
      const tree = shallow(<VoteForm {...defaults} />)
      tree.setState({ step: 'token', data })
      const value = '9823u234t67'
      tree.find('TokenStep').simulate('changeToken', { target: { value } })
      expect(tree.state('data').token).toBe(value)
    })

    it('shows an error message if the token is empty', () => {
      const tree = shallow(<VoteForm {...defaults} />)
      tree.setState({ step: 'token', data: { ...data, token: '' } })
      tree.find('TokenStep').simulate('submit')
      expect(tree.state('error')).toBe('The token should be provided')
    })

    it('casts the user vote', async () => {
      const promise = Promise.resolve()
      const castVote = jest.fn().mockReturnValue(promise)
      const actions = {
        ...defaults.actions,
        castVote
      }
      const tree = shallow(<VoteForm {...defaults} actions={actions} />)
      tree.setState({ step: 'token', data })
      tree.find('TokenStep').simulate('submit')
      await promise
      expect(castVote).toHaveBeenCalledWith(data.token, 1, data.proposal)
      expect(tree.state()).toMatchObject({
        step: 'message',
        success: true
      })
    })

    it('shows a failure message on the last step if the action fails', () => {
      const castVote = jest.fn().mockImplementation(() => {
        throw new Error()
      })
      const actions = {
        ...defaults.actions,
        castVote
      }
      const tree = shallow(<VoteForm {...defaults} actions={actions} />)
      tree.setState({ step: 'token', data })
      tree.find('TokenStep').simulate('submit')
      expect(tree.state()).toMatchObject({
        step: 'message',
        success: false
      })
    })
  })

  describe('message step', () => {
    it('renders the message step', () => {
      const tree = shallow(<VoteForm {...defaults} />)
      tree.setState({ step: 'message', success: true })
      expect(tree.find('MessageStep').exists()).toBe(true)
      expect(tree.find('MessageStep').prop('success')).toBe(true)
    })

    it('lists the polls', () => {
      const actions = { ...defaults.actions, listPolls: jest.fn() }
      const history = { push: jest.fn() }
      const tree = shallow(
        <VoteForm {...defaults} actions={actions} history={history} />
      )
      tree.setState({ step: 'message' })
      tree.find('MessageStep').simulate('listPolls')
      expect(actions.listPolls).toHaveBeenCalled()
      expect(history.push).toHaveBeenCalledWith('/polls')
    })

    it('resets the form', () => {
      const tree = shallow(<VoteForm {...defaults} />)
      tree.setState({ step: 'message', success: true })
      tree.find('MessageStep').simulate('resetForm')
      expect(tree.state('step')).toBe('proposal')
    })
  })
})
