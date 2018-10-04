// @flow
import React, { PureComponent } from 'react'
import { StoreConsumer } from '../app'
import Loading from '../components/loading'

type Props = {
  actions: AppActions,
  state: AppState
}

class Home extends PureComponent<Props> {
  render() {
    return <div>home</div>
  }
}

export default () => (
  <StoreConsumer>
    {store =>
      store ? <Home actions={store.actions} state={store.state} /> : <Loading />
    }
  </StoreConsumer>
)
