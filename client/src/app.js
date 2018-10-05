// @flow
import React, { Fragment, PureComponent } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import { Context } from './store'
import { getContract, type Contract, createPoll } from './contract'
import Loading from './components/loading'
import Header from './components/header'
import Polls from './polls'

type State = {
  contract?: Contract,
  isLoading: boolean,
  store: AppState
}

export default class App extends PureComponent<{}, State> {
  state: State = {
    isLoading: true,
    store: {
      fetchStatus: 'DONE',
      polls: []
    }
  }

  async componentDidMount() {
    const contract = await getContract()
    this.setState({ contract, isLoading: false })
  }

  onCreatePoll = (contract: Contract) => (
    description: string,
    options: string[],
    tokens: string[]
  ) => {
    createPoll(contract, description, options, tokens)
  }

  render() {
    const { contract, isLoading, store: state } = this.state
    const actions = contract && {
      onCreatePoll: this.onCreatePoll(contract)
    }
    return isLoading || !actions ? (
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
