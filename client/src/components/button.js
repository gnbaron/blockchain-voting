// @flow
import React from 'react'
import classnames from 'classnames'
import styles from './button.module.css'

type Props = {
  className?: string,
  text: string
}

const Button = (props: Props) => {
  const { text, className, ...other } = props
  return (
    <button {...other} className={classnames(styles.button, className)}>
      {text}
    </button>
  )
}

export default Button
