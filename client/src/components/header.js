// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './header.module.css'

const Header = () => {
  return (
    <div className={styles.header}>
      <Link className={styles.link} to="/">
        <span className={styles.title}>Blockchain Voting</span>
      </Link>
    </div>
  )
}

export default Header
