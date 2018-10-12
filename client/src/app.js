// @flow
import React, { Fragment, PureComponent } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import { Context } from './store'
import {
  getContract,
  type Contract,
  closePoll,
  createPoll,
  listPolls
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
      polls: []
    }
  }

  async componentDidMount() {
    const contract = await getContract()
    this.setState({ contract })
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

  handleListPolls = (contract: Contract) => () => {
    this.setState(
      { store: { fetchStatus: 'LOADING', polls: [] } },
      async () => {
        this.setState({
          store: {
            fetchStatus: 'DONE',
            polls: await listPolls(contract)
          }
        })
      }
    )
  }

  render() {
    const { contract, store: state } = this.state
    const actions = contract && {
      closePoll: this.handleClosePoll(contract),
      createPoll: this.handleCreatePoll(contract),
      listPolls: this.handleListPolls(contract)
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
