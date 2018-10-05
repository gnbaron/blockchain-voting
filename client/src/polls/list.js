// @flow
import React, { PureComponent } from 'react'
import { Redirect, type Match } from 'react-router-dom'
import { withContext } from '../store'
import Loading from '../components/loading'

type Props = {
  actions: AppActions,
  match: Match,
  state: AppState
}

class PollList extends PureComponent<Props> {
  render() {
    const {
      match,
      state: { fetchStatus, polls }
    } = this.props
    const isLoading = fetchStatus === 'LOADING'
    const isEmpty = fetchStatus === 'DONE' && polls.length === 0

    return isLoading ? (
      <Loading />
    ) : isEmpty ? (
      <Redirect to={`${match.url}/create`} />
    ) : (
      <div>rendering {polls.length} polls</div>
    )
  }
}

export default withContext(PollList)
