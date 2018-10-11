// @flow
import React, { type Node as ReactNode } from 'react'
import classnames from 'classnames'
import styles from './message-box.module.css'

type Props = {
  children: ?ReactNode,
  className?: string,
  type: 'error' | 'warning'
}

const MessageBox = (props: Props) => {
  return (
    <div
      className={classnames(
        styles.wrapper,
        props.className,
        styles[props.type]
      )}
    >
      {props.children}
    </div>
  )
}

export default MessageBox
