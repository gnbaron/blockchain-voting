// @flow
import React from 'react'
import Loading from 'react-loading'
import styles from './loading.module.css'

const BLACK = '#000'

const LoadingIndicator = ({ color = BLACK }: { color?: string }) => (
  <div className={styles.wrapper}>
    <Loading type="spin" color={color} />
  </div>
)

export default LoadingIndicator
