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

export class PollList extends PureComponent<Props> {
  componentDidMount() {
    const {
      actions,
      state: { fetchStatus }
    } = this.props
    if (fetchStatus === 'UNSENT') {
      actions.fetchPolls()
    }
  }

  handleCastVote = (id: number) => () => {
    const { history } = this.props
    history.push(`/polls/${id}/vote`)
  }

  handleCreatePoll = () => {
    const { history } = this.props
    history.push('/polls/create')
  }

  handleClosePoll = (id: number) => async () => {
    const { actions } = this.props
    await actions.closePoll(id)
    actions.fetchPolls()
  }

  handleSeeResults = (id: number) => () => {
    const { history } = this.props
    history.push(`/polls/${id}/results`)
  }

  render() {
    const {
      state: { fetchStatus, polls }
    } = this.props
    const isLoading = fetchStatus === 'LOADING'
    const isEmpty = fetchStatus === 'DONE' && polls.length === 0

    return isLoading ? (
      <Loading />
    ) : isEmpty ? (
      <Redirect to={'/polls/create'} />
    ) : (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Button
            className={styles.button}
            text="Create"
            onClick={this.handleCreatePoll}
          />
        </div>
        {polls.map(poll => (
          <div className={styles.poll} key={poll.id}>
            <span className={styles.description}>{poll.description}</span>
            <div className={styles.controls}>
              {poll.closed ? (
                <Button
                  className={classnames(styles.button, styles.results)}
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
                    className={classnames(styles.button, styles.close)}
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
