// @flow
import React, { Fragment } from 'react'
import classnames from 'classnames'
import styles from './steps.module.css'
import Input from '../../components/input'
import Button from '../../components/button'
import MessageBox from '../../components/message-box'

const ProposalStep = (props: {
  description: string,
  proposals: Proposal[],
  onSelect: (SyntheticInputEvent<*>) => void,
  onSubmit: () => void,
  selected: ?number
}) => (
  <div className={styles.step}>
    <span className={styles.description}>{props.description}</span>
    <div className={styles.proposals}>
      {props.proposals.map(proposal => (
        <label key={proposal.id}>
          <input
            type="radio"
            value={proposal.id}
            checked={proposal.id === props.selected}
            onChange={props.onSelect}
          />
          {proposal.description}
        </label>
      ))}
    </div>
    <div className={styles.footer}>
      <Button onClick={props.onSubmit} text="Próximo" />
    </div>
  </div>
)

const TokenStep = (props: {
  token: string,
  onChangeToken: (SyntheticInputEvent<*>) => void,
  onSubmit: () => void
}) => {
  return (
    <div className={styles.step}>
      <Input
        className={styles.token}
        onChange={props.onChangeToken}
        placeholder="Informe o token"
        type="text"
        value={props.token}
      />
      <div className={styles.footer}>
        <Button onClick={props.onSubmit} text="Votar" />
      </div>
    </div>
  )
}

const MessageStep = (props: {
  success: boolean,
  onFetchPolls: () => void,
  onResetForm: () => void
}) => {
  return (
    <div className={styles.step}>
      {props.success ? (
        <Fragment>
          <MessageBox className={styles.message} type="success">
            Voto registrado com sucesso!
          </MessageBox>
          <div className={styles.footer}>
            <Button onClick={props.onFetchPolls} text="Votações" />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <MessageBox
            className={classnames(styles.message, styles.failure)}
            type="error"
          >
            Problema ao registrar voto!
            <br />
            Possíveis causas:
            <br /> - token inválido
            <br /> - usuário já votou
            <br /> - votação está encerrada
          </MessageBox>
          <div className={styles.footer}>
            <Button onClick={props.onResetForm} text="Voltar" />
          </div>
        </Fragment>
      )}
    </div>
  )
}

export { ProposalStep, TokenStep, MessageStep }
