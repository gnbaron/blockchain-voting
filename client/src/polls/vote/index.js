// @flow
import React, { PureComponent } from 'react'
import { type ContextRouter } from 'react-router-dom'
import { withContext } from '../../store'

type Props = ContextRouter & {
  actions: AppActions,
  state: AppState
}

class VoteForm extends PureComponent<Props> {
  render() {
    return <div>form</div>
  }
}

export default withContext(VoteForm)
