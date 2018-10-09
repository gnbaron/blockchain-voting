// @flow
import React from 'react'
import classnames from 'classnames'
import styles from './input.module.css'

type Props = {
  className?: string,
  type: 'number' | 'text' | 'textarea'
}

const Input = (props: Props) => {
  const className = classnames(styles.input, props.className)
  return props.type === 'textarea' ? (
    <textarea {...props} className={className} />
  ) : (
    <input {...props} className={className} />
  )
}

export default Input
