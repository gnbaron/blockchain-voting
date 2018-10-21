import React from 'react'
import { shallow } from 'enzyme'
import { ProposalStep, TokenStep, MessageStep } from '../steps'

describe('proposal step', () => {
  const defaults = {
    description: 'Poll description',
    proposals: [
      { id: 0, description: 'yes' },
      { id: 1, description: 'no' },
      { id: 2, description: 'maybe' }
    ],
    onSelect: jest.fn(),
    onSubmit: jest.fn(),
    selected: 0
  }

  it('renders the proposals', () => {
    const tree = shallow(<ProposalStep {...defaults} />)
    expect(tree.find('label')).toHaveLength(3)
  })

  it('selects a proposal', () => {
    const onSelect = jest.fn()
    const tree = shallow(<ProposalStep {...defaults} onSelect={onSelect} />)
    const event = { target: { value: 1 } }
    tree
      .find('label')
      .find('input')
      .at(1)
      .simulate('change', event)
    expect(onSelect).toHaveBeenCalledWith(event)
  })

  it('renders the selected proposal', () => {
    const selected = 2
    const tree = shallow(<ProposalStep {...defaults} selected={selected} />)
    expect(
      tree
        .find('label')
        .find('input')
        .at(2)
        .prop('checked')
    ).toBe(true)
  })

  it('calls submit', () => {
    const onSubmit = jest.fn()
    const tree = shallow(<ProposalStep {...defaults} onSubmit={onSubmit} />)
    tree.find('Button').simulate('click')
    expect(onSubmit).toHaveBeenCalled()
  })
})

describe('token step', () => {
  const defaults = {
    token: '',
    onChangeToken: jest.fn(),
    onSubmit: jest.fn()
  }

  it('changes the token', () => {
    const onChangeToken = jest.fn()
    const tree = shallow(
      <TokenStep {...defaults} onChangeToken={onChangeToken} />
    )
    const event = { target: { value: '876123b8612' } }
    tree.find('Input').simulate('change', event)
    expect(onChangeToken).toHaveBeenCalledWith(event)
  })

  it('renders the token', () => {
    const token = '7821tb38172'
    const tree = shallow(<TokenStep {...defaults} token={token} />)
    expect(tree.find('Input').prop('value')).toBe(token)
  })

  it('calls submit', () => {
    const onSubmit = jest.fn()
    const tree = shallow(<TokenStep {...defaults} onSubmit={onSubmit} />)
    tree.find('Button').simulate('click')
    expect(onSubmit).toHaveBeenCalled()
  })
})

describe('message step', () => {
  const defaults = {
    success: false,
    onFetchPolls: jest.fn(),
    onResetForm: jest.fn()
  }

  it('renders a success message', () => {
    const tree = shallow(<MessageStep {...defaults} success />)
    expect(tree.find('MessageBox').exists()).toBe(true)
    expect(tree.find('MessageBox').prop('type')).toBe('success')
  })

  it('renders a failure message', () => {
    const tree = shallow(<MessageStep {...defaults} />)
    expect(tree.find('MessageBox').exists()).toBe(true)
    expect(tree.find('MessageBox').prop('type')).toBe('error')
  })

  it('navigates to the poll list when success', () => {
    const onFetchPolls = jest.fn()
    const tree = shallow(
      <MessageStep {...defaults} success onFetchPolls={onFetchPolls} />
    )
    tree.find('Button').simulate('click')
    expect(onFetchPolls).toHaveBeenCalled()
  })

  it('resets the form when failed', () => {
    const onResetForm = jest.fn()
    const tree = shallow(
      <MessageStep {...defaults} onResetForm={onResetForm} />
    )
    tree.find('Button').simulate('click')
    expect(onResetForm).toHaveBeenCalled()
  })
})
