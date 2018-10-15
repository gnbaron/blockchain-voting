// @flow
import React, { PureComponent } from 'react'
import { type ContextRouter } from 'react-router-dom'
import styles from './index.module.css'
import { withContext } from '../../store'
import StepNav from '../../components/step-nav'
import MessageBox from '../../components/message-box'
import Loading from '../../components/loading'
import { ProposalStep, TokenStep, MessageStep } from './steps'

type Props = ContextRouter & {
  actions: AppActions,
  state: AppState
}

type State = {
  data: {
    proposal: number,
    token: string
  },
  error?: string,
  step: 'proposal' | 'token' | 'message',
  success: boolean
}

export class VoteForm extends PureComponent<Props, State> {
  state: State = {
    data: {
      proposal: -1,
      token: ''
    },
    step: 'proposal',
    success: true
  }

  componentDidMount() {
    const {
      actions,
      state: { fetchStatus }
    } = this.props
    if (fetchStatus === 'UNSENT') {
      actions.listPolls()
    }
  }

  onCastVote = async () => {
    const {
      actions,
      match: {
        params: { id }
      },
      state: { polls }
    } = this.props
    const poll = id && polls.find(poll => poll.id === +id)
    const { proposal, token } = this.state.data
    if (poll) {
      try {
        await actions.castVote(token, poll.id, proposal)
        this.setState({ step: 'message', success: true })
      } catch (e) {
        this.setState({ step: 'message', success: false })
      }
    }
  }

  handleTokenStepSubmit = () => {
    const {
      data: { token }
    } = this.state
    if (!token || token.length === 0) {
      this.setState({ error: 'The token should be provided' })
    } else {
      this.onCastVote()
    }
  }

  handleProposalStepSubmit = () => {
    const {
      data: { proposal }
    } = this.state
    if (proposal < 0) {
      this.setState({ error: 'Select a proposal' })
    } else {
      this.setState({ error: undefined, step: 'token' })
    }
  }

  handleListPolls = () => {
    const { actions, history } = this.props
    actions.listPolls()
    history.push('/polls')
  }

  handleResetForm = () => {
    this.setState({ error: undefined, step: 'proposal' })
  }

  handleSelectProposal = (event: SyntheticInputEvent<*>) => {
    const data = { ...this.state.data, proposal: +event.target.value }
    this.setState({ data })
  }

  handleTokenChange = (event: SyntheticInputEvent<*>) => {
    const data = { ...this.state.data, token: event.target.value }
    this.setState({ data })
  }

  render() {
    const {
      match: {
        params: { id }
      },
      state: { fetchStatus, polls }
    } = this.props
    const isLoading = fetchStatus === 'LOADING'

    const { data, error, step, success } = this.state
    const { proposal, token } = data

    const poll = !isLoading && id && polls.find(poll => poll.id === +id)

    return isLoading ? (
      <Loading />
    ) : (
      <div className={styles.wrapper}>
        {(!poll || poll.closed || error) && (
          <MessageBox className={styles.error} type="error">
            {error || 'Poll not found or closed'}
          </MessageBox>
        )}
        {poll &&
          !poll.closed && (
          <div className={styles.box}>
            <StepNav active={step} steps={['proposal', 'token', 'message']} />
            <div className={styles.content}>
              {step === 'proposal' && (
                <ProposalStep
                  description={poll.description}
                  proposals={poll.proposals}
                  onSelect={this.handleSelectProposal}
                  onSubmit={this.handleProposalStepSubmit}
                  selected={proposal}
                />
              )}
              {step === 'token' && (
                <TokenStep
                  token={token}
                  onChangeToken={this.handleTokenChange}
                  onSubmit={this.handleTokenStepSubmit}
                />
              )}
              {step === 'message' && (
                <MessageStep
                  success={success}
                  onListPolls={this.handleListPolls}
                  onResetForm={this.handleResetForm}
                />
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withContext(VoteForm)
