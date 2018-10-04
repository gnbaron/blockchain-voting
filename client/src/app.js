// @flow
import React, { createContext, Fragment, PureComponent } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { getContract, type Contract, createPoll } from './contract'
import Loading from './components/loading'
import Header from './components/header'
import Home from './polls'

const Context = createContext()

type State = {
  contract?: Contract,
  isLoading: boolean,
  store: AppState
}

export default class App extends PureComponent<{}, State> {
  state: State = {
    isLoading: true,
    store: {
      fetchStatus: 'UNSENT',
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
            <Route exact path="/" component={Home} />
          </Fragment>
        </Router>
      </Context.Provider>
    )
  }
}

export const StoreConsumer = Context.Consumer
