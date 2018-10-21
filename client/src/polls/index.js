// @flow
import React, { Fragment } from 'react'
import { Route, type ContextRouter } from 'react-router-dom'
import PollList from './list'
import PollForm from './form'
import PollResult from './result'
import VoteForm from './vote'

const Polls = ({ match }: ContextRouter) => (
  <Fragment>
    <Route exact path={`${match.url}`} component={PollList} />
    <Route path={`${match.url}/create`} component={PollForm} />
    <Route path={`${match.url}/:id/vote`} component={VoteForm} />
    <Route path={`${match.url}/:id/results`} component={PollResult} />
  </Fragment>
)

export default Polls
