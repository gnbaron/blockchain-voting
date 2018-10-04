// @flow
import React from 'react'
import { Link } from 'react-router-dom'

import './header.css'

const Header = () => {
  return (
    <div className="header">
      <Link className="link" to="/">
        <span className="title">Blockchain Voting</span>
      </Link>
    </div>
  )
}

export default Header
