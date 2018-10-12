// @flow
import React, { Fragment } from 'react'
import { Route, type ContextRouter } from 'react-router-dom'
import PollList from './list'
import PollForm from './form'
import VoteForm from './vote'

const Polls = ({ match }: ContextRouter) => (
  <Fragment>
    <Route exact path={`${match.url}`} component={PollList} />
    <Route path={`${match.url}/create`} component={PollForm} />
    <Route path={`${match.url}/:id/vote`} component={VoteForm} />
    {/* <Route path={`${match.url}/:id/results`} component={} /> */}
  </Fragment>
)

export default Polls
