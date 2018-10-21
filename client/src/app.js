// @flow
import React, { Fragment, PureComponent } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import { Context } from './store'
import getContract, {
  type Contract,
  castVote,
  closePoll,
  createPoll,
  getPolls,
  getResults
} from './contract'
import Loading from './components/loading'
import Header from './components/header'
import Polls from './polls'

type State = {
  contract?: Contract,
  store: AppState
}

export default class App extends PureComponent<{}, State> {
  state: State = {
    store: {
      fetchStatus: 'UNSENT',
      polls: [],
      results: {}
    }
  }

  async componentDidMount() {
    const contract = await getContract()
    this.setState({ contract })
  }

  handleCastVote = (contract: Contract) => (
    token: string,
    pollId: number,
    proposalId: number
  ) => {
    return castVote(contract, token, pollId, proposalId)
  }

  handleClosePoll = (contract: Contract) => (id: number) => {
    return closePoll(contract, id)
  }

  handleCreatePoll = (contract: Contract) => (
    description: string,
    options: string[],
    tokens: string[]
  ) => {
    return createPoll(contract, description, options, tokens)
  }

  handleFetchPolls = (contract: Contract) => () => {
    const store = { ...this.state.store, fetchStatus: 'LOADING', polls: [] }
    this.setState({ store }, async () => {
      this.setState({
        store: {
          ...this.state.store,
          fetchStatus: 'DONE',
          polls: await getPolls(contract)
        }
      })
    })
  }

  handleFetchResults = (contract: Contract) => async (poll: Poll) => {
    const results = {
      ...this.state.store.results,
      [poll.id]: await getResults(contract, poll)
    }
    const store = { ...this.state.store, results }
    this.setState({ store })
  }

  render() {
    const { contract, store: state } = this.state
    const actions = contract && {
      castVote: this.handleCastVote(contract),
      closePoll: this.handleClosePoll(contract),
      createPoll: this.handleCreatePoll(contract),
      fetchPolls: this.handleFetchPolls(contract),
      fetchResults: this.handleFetchResults(contract)
    }
    return !contract ? (
      <Loading />
    ) : (
      <Context.Provider value={{ actions, state }}>
        <Router>
          <Fragment>
            <Header />
            <Switch>
              <Route path="/polls" component={Polls} />
              <Redirect to="/polls" />
            </Switch>
          </Fragment>
        </Router>
      </Context.Provider>
    )
  }
}
