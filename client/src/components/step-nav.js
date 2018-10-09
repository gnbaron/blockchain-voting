// @flow
import React from 'react'
import classnames from 'classnames'
import styles from './step-nav.module.css'

type Props = {
  active?: string,
  steps: string[]
}

export default ({ active, steps }: Props) => (
  <div className={styles.wrapper}>
    {steps.map((step, index) => (
      <span
        className={classnames(
          styles.step,
          (active ? step === active : index === 0) && styles.active
        )}
        key={index}
      />
    ))}
  </div>
)
