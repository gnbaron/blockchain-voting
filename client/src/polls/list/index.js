// @flow
import React, { Fragment, PureComponent } from 'react'
import { Redirect, type ContextRouter } from 'react-router-dom'
import classnames from 'classnames'
import styles from './index.module.css'
import { withContext } from '../../store'
import Loading from '../../components/loading'
import Button from '../../components/button'

type Props = ContextRouter & {
  actions: AppActions,
  state: AppState
}

class PollList extends PureComponent<Props> {
  componentDidMount() {
    const {
      actions,
      state: { fetchStatus }
    } = this.props
    if (fetchStatus === 'UNSENT') {
      actions.listPolls()
    }
  }

  handleCastVote = (id: number) => () => {
    const { history } = this.props
    history.push(`/polls/${id}/vote`)
  }

  handleClosePoll = (id: number) => async () => {
    const { actions } = this.props
    await actions.closePoll(id)
    actions.listPolls()
  }

  handleSeeResults = (id: number) => () => {
    const { history } = this.props
    history.push(`/polls/${id}/results`)
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
            <span className={styles.description}>{poll.description}</span>
            <div className={styles.controls}>
              {poll.closed ? (
                <Button
                  className={styles.button}
                  text="Results"
                  onClick={this.handleSeeResults(poll.id)}
                />
              ) : (
                <Fragment>
                  <Button
                    className={styles.button}
                    text="Vote"
                    onClick={this.handleCastVote(poll.id)}
                  />
                  <Button
                    className={classnames(styles.button, styles.alert)}
                    text="Close"
                    onClick={this.handleClosePoll(poll.id)}
                  />
                </Fragment>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default withContext(PollList)
