// @flow
declare type Proposal = {
  id: number,
  description: string
}

declare type Poll = {
  id: number,
  description: string,
  proposals: Proposal[]
}

declare type AppActions = {}

declare type AppState = {
  fetchStatus: 'UNSENT' | 'LOADING' | 'DONE',
  polls: Poll[]
}
