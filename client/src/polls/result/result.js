// @flow
import React, { PureComponent } from 'react'
import { type RouterHistory } from 'react-router-dom'
import classnames from 'classnames'
import styles from './result.module.css'
import Loading from '../../components/loading'
import Button from '../../components/button'

type Props = {
  actions: AppActions,
  state: AppState,
  poll: Poll,
  history: RouterHistory
}

export default class PollResult extends PureComponent<Props> {
  componentDidMount() {
    const {
      actions,
      poll,
      state: { results }
    } = this.props
    if (!results[poll.id]) {
      actions.fetchResults(poll)
    }
  }

  handleBack = () => {
    const { history } = this.props
    history.push('/polls')
  }

  render() {
    const {
      poll: { id, proposals },
      state: { results }
    } = this.props
    const data = results[id]
    return !data ? (
      <Loading />
    ) : (
      <div className={styles.box}>
        <div className={styles.content}>
          <div className={styles.results}>
            <div className={classnames(styles.proposal, styles.header)}>
              <div className={styles.description}>Proposta</div>
              <div className={styles.votes}>Votos</div>
            </div>
            {data.map(result => {
              const proposal = proposals.find(
                ({ id }) => id === result.proposal
              )
              return (
                <div
                  className={styles.proposal}
                  data-test="proposal"
                  key={result.proposal}
                >
                  <div className={styles.description}>
                    {proposal && proposal.description}
                  </div>
                  <div className={styles.votes}>{result.votes}</div>
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles.footer}>
          <Button onClick={this.handleBack} text="Voltar" />
        </div>
      </div>
    )
  }
}
