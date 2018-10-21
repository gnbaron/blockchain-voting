// @flow
import React, { PureComponent } from 'react'
import { type ContextRouter } from 'react-router-dom'
import styles from './index.module.css'
import { withContext } from '../../store'
import MessageBox from '../../components/message-box'
import Loading from '../../components/loading'
import PollResult from './result'

type Props = ContextRouter & {
  actions: AppActions,
  state: AppState
}

export class Results extends PureComponent<Props> {
  componentDidMount() {
    const {
      actions,
      state: { fetchStatus }
    } = this.props
    if (fetchStatus === 'UNSENT') {
      actions.fetchPolls()
    }
  }

  render() {
    const {
      actions,
      history,
      match: {
        params: { id }
      },
      state
    } = this.props
    const { fetchStatus, polls } = state
    const isLoading = fetchStatus === 'LOADING'
    const poll = !isLoading && id && polls.find(poll => poll.id === +id)

    return isLoading ? (
      <Loading />
    ) : (
      <div className={styles.wrapper}>
        {!poll || !poll.closed ? (
          <MessageBox className={styles.error} type="error">
            {'Poll not found or still open'}
          </MessageBox>
        ) : (
          <PollResult
            actions={actions}
            state={state}
            poll={poll}
            history={history}
          />
        )}
      </div>
    )
  }
}

export default withContext(Results)
