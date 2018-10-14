import React from 'react'
import { shallow } from 'enzyme'
import { PollList } from '../index'

describe('poll list', () => {
  const defaults = {
    actions: {
      closePoll: jest.fn(),
      listPolls: jest.fn()
    },
    history: {
      push: jest.fn()
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
        },
        {
          id: 2,
          description: 'Poll 2',
          closed: true,
          proposals: [
            { id: 1, description: 'yes' },
            { id: 2, description: 'no' },
            { id: 3, description: 'maybe' }
          ]
        }
      ]
    }
  }

  it('fetches the data if not loaded', () => {
    const listPolls = jest.fn()
    const actions = { listPolls }
    const state = { fetchStatus: 'UNSENT', polls: [] }
    shallow(<PollList {...defaults} actions={actions} state={state} />)
    expect(listPolls).toHaveBeenCalled()
  })

  it('does not fetch data if already fetching', () => {
    const listPolls = jest.fn()
    const actions = { listPolls }
    const state = { fetchStatus: 'LOADING', polls: [] }
    shallow(<PollList {...defaults} actions={actions} state={state} />)
    expect(listPolls).not.toHaveBeenCalled()
  })

  it('does not fetch data if already loaded', () => {
    const listPolls = jest.fn()
    const actions = { listPolls }
    shallow(<PollList {...defaults} actions={actions} />)
    expect(listPolls).not.toHaveBeenCalled()
  })

  it('renders a loading state if loading', () => {
    const state = { fetchStatus: 'LOADING', polls: [] }
    const tree = shallow(<PollList {...defaults} state={state} />)
    expect(tree.find('LoadingIndicator').exists()).toBe(true)
  })

  it('redirects to poll form if empty', () => {
    const state = { fetchStatus: 'DONE', polls: [] }
    const tree = shallow(<PollList {...defaults} state={state} />)
    expect(tree.find('Redirect').exists()).toBe(true)
    expect(tree.find('Redirect').prop('to')).toBe('/polls/create')
  })

  it('renders the polls', () => {
    const tree = shallow(<PollList {...defaults} />)
    expect(tree.find('.poll')).toHaveLength(2)
    expect(
      tree
        .find('.description')
        .at(0)
        .text()
    ).toBe(defaults.state.polls[0].description)
    expect(
      tree
        .find('.description')
        .at(1)
        .text()
    ).toBe(defaults.state.polls[1].description)
  })

  it('renders button controls for an open poll', () => {
    const state = { ...defaults.state, polls: [defaults.state.polls[0]] }
    const tree = shallow(<PollList {...defaults} state={state} />)
    expect(tree.find('[text="Results"]').exists()).toBe(false)
    expect(tree.find('[text="Vote"]').exists()).toBe(true)
    expect(tree.find('[text="Close"]').exists()).toBe(true)
  })

  it('renders button controls for a closed poll', () => {
    const state = { ...defaults.state, polls: [defaults.state.polls[1]] }
    const tree = shallow(<PollList {...defaults} state={state} />)
    expect(tree.find('[text="Results"]').exists()).toBe(true)
    expect(tree.find('[text="Vote"]').exists()).toBe(false)
    expect(tree.find('[text="Close"]').exists()).toBe(false)
  })

  it('navigates to the poll form', () => {
    const push = jest.fn()
    const history = { push }
    const tree = shallow(<PollList {...defaults} history={history} />)
    tree.find('[text="Create"]').simulate('click')
    expect(push).toHaveBeenCalledWith('/polls/create')
  })

  it('navigates to the vote page', () => {
    const push = jest.fn()
    const history = { push }
    const state = { ...defaults.state, polls: [defaults.state.polls[0]] }
    const tree = shallow(
      <PollList {...defaults} state={state} history={history} />
    )
    tree.find('[text="Vote"]').simulate('click')
    expect(push).toHaveBeenCalledWith('/polls/1/vote')
  })

  it('closes the poll', () => {
    const closePoll = jest.fn()
    const actions = { closePoll }
    const state = { ...defaults.state, polls: [defaults.state.polls[0]] }
    const tree = shallow(
      <PollList {...defaults} state={state} actions={actions} />
    )
    tree.find('[text="Close"]').simulate('click')
    expect(closePoll).toHaveBeenCalledWith(1)
  })

  it('navigates to the results page', () => {
    const push = jest.fn()
    const history = { push }
    const state = { ...defaults.state, polls: [defaults.state.polls[1]] }
    const tree = shallow(
      <PollList {...defaults} state={state} history={history} />
    )
    tree.find('[text="Results"]').simulate('click')
    expect(push).toHaveBeenCalledWith('/polls/2/results')
  })
})
