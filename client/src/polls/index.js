// @flow
import React, { PureComponent } from 'react'
import { StoreConsumer } from '../app'

type Props = {}

export default class Home extends PureComponent<Props> {
  render() {
    return <StoreConsumer>{store => <div>{store.state}</div>}</StoreConsumer>
  }
}
