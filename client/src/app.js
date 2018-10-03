// @flow
import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/header'
import Home from './polls'

export default class App extends PureComponent<{}, AppState> {
  state: {}

  render() {
    return (
      <Router>
        <Header />
        <Route exact path="/" component={Home} />
      </Router>
    )
  }
}
