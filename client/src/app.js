// @flow
import React, { createContext, Fragment, PureComponent } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import truffleContract from 'truffle-contract'
import { getWeb3 } from './utils'
import VotingContract from './contracts/Voting.json'
import Loading from './components/loading'
import Header from './components/header'
import Home from './polls'

const Context = createContext()

type State = {
  store: AppState,
  isLoading: boolean,
  instance?: any,
  web3?: any
}

export default class App extends PureComponent<{}, State> {
  state = { isLoading: true, store: {} }

  async componentDidMount() {
    // Get network provider and web3 instance.
    const web3 = await getWeb3()

    // Get the contract instance.
    const contract = truffleContract(VotingContract)
    contract.setProvider(web3.currentProvider)
    const instance = await contract.deployed()

    this.setState({ isLoading: false, instance, web3 })
  }

  render() {
    const { isLoading, store: state } = this.state
    const actions = {}
    return isLoading ? (
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
