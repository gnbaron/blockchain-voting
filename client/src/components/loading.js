// @flow
import React from 'react'
import Loading from 'react-loading'
import styles from './loading.module.css'

const PRIMARY_COLOR = '#443854'

const LoadingIndicator = ({ color = PRIMARY_COLOR }: { color?: string }) => (
  <div className={styles.wrapper}>
    <Loading type="spin" color={color} />
  </div>
)

export default LoadingIndicator
