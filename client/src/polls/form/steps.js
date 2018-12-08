// @flow
import React, { PureComponent } from 'react'
import styles from './steps.module.css'
import Input from '../../components/input'
import Button from '../../components/button'
import MessageBox from '../../components/message-box'

const BasicStep = (props: {
  description: string,
  voters: number,
  onChangeDescription: (SyntheticInputEvent<*>) => void,
  onChangeVoters: (SyntheticInputEvent<*>) => void,
  onSubmit: () => void
}) => (
  <div className={styles.step}>
    <Input
      className={styles.description}
      onChange={props.onChangeDescription}
      placeholder="O que precisa ser votado?"
      rows={2}
      type="textarea"
      value={props.description}
    />
    <div className={styles.voters}>
      <span className={styles.label}>Número de votantes:</span>
      <Input
        className={styles.input}
        onChange={props.onChangeVoters}
        placeholder="Votantes"
        min={1}
        max={999}
        type="number"
        value={props.voters}
      />
    </div>
    <div className={styles.footer}>
      <Button onClick={props.onSubmit} text="Próximo" />
    </div>
  </div>
)

class ProposalStep extends PureComponent<
  {
    proposals: string[],
    onUpdateProposals: (string[]) => void,
    onSubmit: () => void
  },
  { adding: string }
> {
  state = {
    adding: ''
  }

  onAdd = () => {
    const { proposals, onUpdateProposals } = this.props
    const { adding } = this.state
    if (adding && adding.length > 0) {
      onUpdateProposals([...proposals, adding])
      this.setState({ adding: '' })
    }
  }

  handleProposalChange = (event: SyntheticInputEvent<*>) => {
    this.setState({ adding: event.target.value })
  }

  handleProposalKeyDown = (event: SyntheticKeyboardEvent<*>) => {
    if (event.key === 'Enter') {
      this.onAdd()
    }
  }

  handleProposalBlur = () => {
    this.onAdd()
  }

  handleUpdateProposal = (index: number) => (event: SyntheticInputEvent<*>) => {
    const { proposals, onUpdateProposals } = this.props
    onUpdateProposals(
      Object.assign([...proposals], {
        [index]: event.target.value
      })
    )
  }

  render() {
    const { proposals, onSubmit } = this.props
    const { adding } = this.state
    return (
      <div className={styles.step}>
        {proposals.map((value, index) => (
          <Input
            className={styles.proposal}
            onChange={this.handleUpdateProposal(index)}
            maxLength="32"
            type="text"
            key={index}
            value={value}
          />
        ))}
        <Input
          className={styles.proposal}
          onBlur={this.handleProposalBlur}
          onChange={this.handleProposalChange}
          onKeyDown={this.handleProposalKeyDown}
          placeholder="Adicionar proposta"
          maxLength="32"
          type="text"
          value={adding}
        />
        <div className={styles.footer}>
          <Button onClick={onSubmit} text="Salvar" />
        </div>
      </div>
    )
  }
}

const TokenStep = (props: { tokens: string[], onFetchPolls: () => void }) => {
  const content = props.tokens.join('\n')
  return (
    <div className={styles.step}>
      <MessageBox className={styles.warning} type="warning">
        Salve e envie um token para cada usuário votante!
      </MessageBox>
      <Input
        className={styles.tokens}
        disabled
        type="textarea"
        value={content}
      />
      <div className={styles.footer}>
        <Button onClick={props.onFetchPolls} text="Votações" />
      </div>
    </div>
  )
}

export { BasicStep, ProposalStep, TokenStep }
