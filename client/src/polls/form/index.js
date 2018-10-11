// @flow
import React, { PureComponent } from 'react'
import { type ContextRouter } from 'react-router-dom'
import styles from './index.module.css'
import { withContext } from '../../store'
import { generateTokens } from '../../utils'
import StepNav from '../../components/step-nav'
import MessageBox from '../../components/message-box'
import { BasicStep, ProposalStep, TokenStep } from './steps'

type Props = ContextRouter & {
  actions: AppActions,
  state: AppState
}

type State = {
  data: {
    description: string,
    proposals: string[],
    voters: number
  },
  error?: string,
  generatedTokens: string[],
  step: 'basic' | 'proposals' | 'tokens'
}

export class PollForm extends PureComponent<Props, State> {
  state: State = {
    data: {
      description: '',
      proposals: [],
      voters: 2
    },
    generatedTokens: [],
    step: 'basic'
  }

  onSave = async () => {
    const { actions } = this.props
    const { description, proposals, voters } = this.state.data
    const generatedTokens = generateTokens(voters)
    await actions.createPoll(description, proposals, generatedTokens)
    this.setState({ step: 'tokens', generatedTokens, error: undefined })
  }

  handleBasicStepSubmit = () => {
    const {
      data: { description, voters }
    } = this.state
    let error
    if (!description || description.length === 0) {
      error = 'Invalid description!'
    } else if (voters < 2) {
      error = 'At least 2 voters are needed!'
    }
    if (error) {
      this.setState({ error })
    } else {
      this.setState({ error: undefined, step: 'proposals' })
    }
  }

  handleProposalStepSubmit = () => {
    const { proposals } = this.state.data
    if (proposals.length < 2) {
      this.setState({ error: 'At least 2 proposals are needed!' })
    } else {
      this.onSave()
    }
  }

  handleNavigateToPollList = () => {
    const { history } = this.props
    history.push('/polls')
  }

  handleDescriptionChange = (event: SyntheticInputEvent<*>) => {
    const data = { ...this.state.data, description: event.target.value }
    this.setState({ data })
  }

  handleVotersChange = (event: SyntheticInputEvent<*>) => {
    const data = { ...this.state.data, voters: Number(event.target.value) }
    this.setState({ data })
  }

  handleProposalsChange = (proposals: string[]) => {
    const data = { ...this.state.data, proposals }
    this.setState({ data })
  }

  render() {
    const { data, error, generatedTokens, step } = this.state
    const { description, proposals, voters } = data
    return (
      <div className={styles.wrapper}>
        {error && (
          <MessageBox className={styles.error} type="error">
            {error}
          </MessageBox>
        )}
        <div className={styles.box}>
          <StepNav active={step} steps={['basic', 'proposals', 'tokens']} />
          <div className={styles.content}>
            {step === 'basic' && (
              <BasicStep
                description={description}
                voters={voters}
                onChangeDescription={this.handleDescriptionChange}
                onChangeVoters={this.handleVotersChange}
                onSubmit={this.handleBasicStepSubmit}
              />
            )}
            {step === 'proposals' && (
              <ProposalStep
                proposals={proposals}
                onUpdateProposals={this.handleProposalsChange}
                onSubmit={this.handleProposalStepSubmit}
              />
            )}
            {step === 'tokens' && (
              <TokenStep
                tokens={generatedTokens}
                onNavigateToPollList={this.handleNavigateToPollList}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default withContext(PollForm)
