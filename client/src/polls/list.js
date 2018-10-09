// @flow
import React, { PureComponent } from 'react'
import { Redirect, type ContextRouter } from 'react-router-dom'
import styles from './list.module.css'
import { withContext } from '../store'
import Loading from '../components/loading'

type Props = ContextRouter & {
  actions: AppActions,
  state: AppState
}

class PollList extends PureComponent<Props> {
  componentDidMount() {
    const { actions } = this.props
    actions.listPolls()
  }

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
      <div className={styles.wrapper}>
        {polls.map(poll => (
          <div className={styles.poll} key={poll.id}>
            <div>
              {poll.id} - {poll.description}
            </div>
            Proposals:
            {poll.proposals.map(proposal => (
              <div key={proposal.id}>
                {proposal.id} - {proposal.description}
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }
}

export default withContext(PollList)
