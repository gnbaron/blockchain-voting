// @flow
import React from 'react'
import { Link } from 'react-router-dom'
// import './header.css'

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <span>Voting App</span>
      </Link>
    </div>
  )
}

export default Header
