import React from 'react'
import { shallow } from 'enzyme'
import PollResult from '../result'

describe('poll result item', () => {
  const defaults = {
    actions: {
      fetchPolls: jest.fn(),
      fetchResults: jest.fn()
    },
    history: {
      push: jest.fn()
    },
    poll: {
      id: 1,
      description: 'Poll 1',
      closed: true,
      proposals: [{ id: 1, description: 'yes' }, { id: 2, description: 'no' }]
    },
    state: {
      results: {
        1: [{ proposal: 1, votes: 3 }, { proposal: 2, votes: 2 }]
      }
    }
  }

  it('fetches the data if not loaded', () => {
    const fetchResults = jest.fn()
    const actions = { fetchResults }
    const state = { results: {} }
    shallow(<PollResult {...defaults} actions={actions} state={state} />)
    expect(fetchResults).toHaveBeenCalled()
  })

  it('does not fetch data if already loaded', () => {
    const fetchResults = jest.fn()
    const actions = { fetchResults }
    shallow(<PollResult {...defaults} actions={actions} />)
    expect(fetchResults).not.toHaveBeenCalled()
  })

  it('renders a loading state while loading the results', () => {
    const state = { results: {} }
    const tree = shallow(<PollResult {...defaults} state={state} />)
    expect(tree.find('LoadingIndicator').exists()).toBe(true)
  })

  it('renders the results', () => {
    const tree = shallow(<PollResult {...defaults} />)
    expect(tree.find('[data-test="proposal"]')).toHaveLength(2)
    const yes = tree.find('[data-test="proposal"]').at(0)
    const no = tree.find('[data-test="proposal"]').at(1)
    expect(yes.find('.description').text()).toBe('yes')
    expect(yes.find('.votes').text()).toBe('3')
    expect(no.find('.description').text()).toBe('no')
    expect(no.find('.votes').text()).toBe('2')
  })

  it('renders a button to navigate to the poll list', () => {
    const push = jest.fn()
    const history = { push }
    const tree = shallow(<PollResult {...defaults} history={history} />)
    tree.find('Button').simulate('click')
    expect(push).toHaveBeenCalledWith('/polls')
  })
})
