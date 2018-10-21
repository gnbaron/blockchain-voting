import React from 'react'
import { shallow } from 'enzyme'
import { BasicStep, ProposalStep, TokenStep } from '../steps'

describe('basic step', () => {
  const defaults = {
    description: 'some poll',
    voters: 15,
    onChangeDescription: jest.fn(),
    onChangeVoters: jest.fn(),
    onSubmit: jest.fn()
  }

  it('changes the description', () => {
    const onChangeDescription = jest.fn()
    const tree = shallow(
      <BasicStep {...defaults} onChangeDescription={onChangeDescription} />
    )
    expect(tree.find('.description').prop('value')).toBe(defaults.description)
    const event = { target: { value: 'new description' } }
    tree.find('.description').simulate('change', event)
    expect(onChangeDescription).toHaveBeenCalledWith(event)
  })

  it('changes the voters count', () => {
    const onChangeVoters = jest.fn()
    const tree = shallow(
      <BasicStep {...defaults} onChangeVoters={onChangeVoters} />
    )
    const selector = tree => tree.find('.voters').find('.input')
    expect(selector(tree).prop('value')).toBe(defaults.voters)
    const event = { target: { value: '10' } }
    selector(tree).simulate('change', event)
    expect(onChangeVoters).toHaveBeenCalledWith(event)
  })

  it('calls submit', () => {
    const onSubmit = jest.fn()
    const tree = shallow(<BasicStep {...defaults} onSubmit={onSubmit} />)
    tree.find('Button').simulate('click')
    expect(onSubmit).toHaveBeenCalled()
  })
})

describe('proposal step', () => {
  const defaults = {
    proposals: ['yes', 'no'],
    onUpdateProposals: jest.fn(),
    onSubmit: jest.fn()
  }

  it('uses internal state to handle the new proposal value change', () => {
    const tree = shallow(<ProposalStep {...defaults} proposals={[]} />)
    const value = 'new proposal'
    tree.find('Input').simulate('change', { target: { value } })
    expect(tree.state('adding')).toBe(value)
  })

  it('saves the new proposal on Enter key down', () => {
    const onUpdateProposals = jest.fn()
    const tree = shallow(
      <ProposalStep
        {...defaults}
        proposals={[]}
        onUpdateProposals={onUpdateProposals}
      />
    )
    const adding = 'new proposal'
    tree.setState({ adding })
    tree.find('Input').simulate('keyDown', { key: 'Enter' })
    expect(onUpdateProposals).toHaveBeenCalledWith([adding])
  })

  it('does not save the new proposal on other keys', () => {
    const onUpdateProposals = jest.fn()
    const tree = shallow(
      <ProposalStep
        {...defaults}
        proposals={[]}
        onUpdateProposals={onUpdateProposals}
      />
    )
    tree.setState({ adding: 'new proposal' })
    tree.find('Input').simulate('keyDown', { key: ' ' })
    expect(onUpdateProposals).not.toHaveBeenCalled()
  })

  it('saves the new proposal on blur', () => {
    const onUpdateProposals = jest.fn()
    const tree = shallow(
      <ProposalStep
        {...defaults}
        proposals={[]}
        onUpdateProposals={onUpdateProposals}
      />
    )
    const adding = 'new proposal'
    tree.setState({ adding })
    tree.find('Input').simulate('blur')
    expect(onUpdateProposals).toHaveBeenCalledWith([adding])
  })

  it('updates the proposals', () => {
    const onUpdateProposals = jest.fn()
    const tree = shallow(
      <ProposalStep {...defaults} onUpdateProposals={onUpdateProposals} />
    )
    expect(tree.find('Input')).toHaveLength(3)
    const value = 'new value'
    tree
      .find('Input')
      .first()
      .simulate('change', { target: { value } })
    expect(onUpdateProposals).toHaveBeenCalledWith([
      value,
      defaults.proposals[1]
    ])
  })
})

describe('token step', () => {
  const defaults = {
    tokens: ['abc', 'def', 'ghi'],
    onFetchPolls: jest.fn()
  }

  it('renders a warning', () => {
    const tree = shallow(<TokenStep {...defaults} />)
    expect(tree.find('MessageBox').exists()).toBe(true)
    expect(tree.find('MessageBox').prop('type')).toBe('warning')
  })

  it('renders the tokens as a textarea', () => {
    const tree = shallow(<TokenStep {...defaults} />)
    expect(tree.find('Input').prop('value')).toBe(defaults.tokens.join('\n'))
  })

  it('navigates to the poll list', () => {
    const onFetchPolls = jest.fn()
    const tree = shallow(<TokenStep {...defaults} onFetchPolls={onFetchPolls} />)
    tree.find('Button').simulate('click')
    expect(onFetchPolls).toHaveBeenCalled()
  })
})
