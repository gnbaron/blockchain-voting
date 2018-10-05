// @flow
import React, { PureComponent } from 'react'
import { withContext } from '../store'

type Props = {
  actions: AppActions,
  state: AppState
}

class PollForm extends PureComponent<Props> {
  render() {
    return <div>rendering polls form</div>
  }
}

export default withContext(PollForm)
