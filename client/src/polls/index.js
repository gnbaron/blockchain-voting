// @flow
import React, { Fragment } from 'react'
import { Route, type ContextRouter } from 'react-router-dom'
import PollList from './list'
import PollForm from './form'

const Polls = ({ match }: ContextRouter) => (
  <Fragment>
    <Route exact path={`${match.url}`} component={PollList} />
    <Route path={`${match.url}/create`} component={PollForm} />
  </Fragment>
)

export default Polls
