// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import App from './app'

import './index.css'

const root = document.getElementById('root')

if (root) {
  ReactDOM.render(<App />, root)
}

registerServiceWorker()
