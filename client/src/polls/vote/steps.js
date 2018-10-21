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
      <Button onClick={props.onSubmit} text="Next" />
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
        placeholder="Your Token"
        type="text"
        value={props.token}
      />
      <div className={styles.footer}>
        <Button onClick={props.onSubmit} text="Vote" />
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
            Vote saved successfuly!
          </MessageBox>
          <div className={styles.footer}>
            <Button onClick={props.onFetchPolls} text="Polls" />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <MessageBox
            className={classnames(styles.message, styles.failure)}
            type="error"
          >
            Something went wrong!
            <br />
            Possible causes:
            <br /> - invalid token
            <br /> - user already voted
            <br /> - poll is closed
          </MessageBox>
          <div className={styles.footer}>
            <Button onClick={props.onResetForm} text="Back" />
          </div>
        </Fragment>
      )}
    </div>
  )
}

export { ProposalStep, TokenStep, MessageStep }
