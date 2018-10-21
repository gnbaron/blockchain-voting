import React from 'react'
import { shallow } from 'enzyme'
import { Results } from '../index'

describe('poll results', () => {
  const defaults = {
    actions: {
      fetchPolls: jest.fn()
    },
    history: {
      push: jest.fn()
    },
    match: {
      params: { id: '1' }
    },
    state: {
      fetchStatus: 'DONE',
      polls: [
        {
          id: 1,
          description: 'Poll 1',
          closed: true,
          proposals: [
            { id: 1, description: 'yes' },
            { id: 2, description: 'no' }
          ]
        }
      ]
    }
  }

  it('fetches the data if not loaded', () => {
    const fetchPolls = jest.fn()
    const actions = { fetchPolls }
    const state = { fetchStatus: 'UNSENT', polls: [] }
    shallow(<Results {...defaults} actions={actions} state={state} />)
    expect(fetchPolls).toHaveBeenCalled()
  })

  it('does not fetch data if already fetching', () => {
    const fetchPolls = jest.fn()
    const actions = { fetchPolls }
    const state = { fetchStatus: 'LOADING', polls: [] }
    shallow(<Results {...defaults} actions={actions} state={state} />)
    expect(fetchPolls).not.toHaveBeenCalled()
  })

  it('does not fetch data if already loaded', () => {
    const fetchPolls = jest.fn()
    const actions = { fetchPolls }
    shallow(<Results {...defaults} actions={actions} />)
    expect(fetchPolls).not.toHaveBeenCalled()
  })

  it('renders a loading state if loading', () => {
    const state = { fetchStatus: 'LOADING', polls: [] }
    const tree = shallow(<Results {...defaults} state={state} />)
    expect(tree.find('LoadingIndicator').exists()).toBe(true)
  })

  it('renders an error message if poll is missing', () => {
    const state = { fetchStatus: 'DONE', polls: [] }
    const tree = shallow(<Results {...defaults} state={state} />)
    expect(tree.find('MessageBox').exists()).toBe(true)
    expect(tree.find('MessageBox').prop('children')).toBe(
      'Poll not found or still open'
    )
  })

  it('renders an error message if poll is not closed', () => {
    const state = {
      fetchStatus: 'DONE',
      polls: [{ ...defaults.state.polls[0], closed: false }]
    }
    const tree = shallow(<Results {...defaults} state={state} />)
    expect(tree.find('MessageBox').exists()).toBe(true)
    expect(tree.find('MessageBox').prop('children')).toBe(
      'Poll not found or still open'
    )
  })

  it('renders the results', () => {
    const tree = shallow(<Results {...defaults} />)
    expect(tree.find('PollResult').exists()).toBe(true)
    expect(tree.find('PollResult').prop('poll')).toBe(defaults.state.polls[0])
  })
})
