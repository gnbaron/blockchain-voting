import React, { createContext } from 'react'

const Context = createContext()

const withContext = Component => {
  return props => {
    return (
      <Context.Consumer>
        {store =>
          store && (
            <Component {...props} actions={store.actions} state={store.state} />
          )
        }
      </Context.Consumer>
    )
  }
}

export { Context, withContext }
