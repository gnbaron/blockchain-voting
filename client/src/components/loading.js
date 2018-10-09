// @flow
import React from 'react'
import Loading from 'react-loading'
import styles from './loading.module.css'

const BLACK = '#000'

export default ({ color = BLACK }: { color?: string }) => (
  <div className={styles.wrapper}>
    <Loading type="spin" color={color} />
  </div>
)
