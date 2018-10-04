// @flow
import React from 'react'
import Loading from 'react-loading'

import './loading.css'

const BLACK = '#000'

export default ({ color = BLACK }: { color?: string }) => (
  <div className="wrapper">
    <Loading type="spin" color={color} />
  </div>
)
