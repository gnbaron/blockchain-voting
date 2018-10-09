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

declare type AppActions = {
  createPoll: (
    description: string,
    options: string[],
    tokens: string[]
  ) => void,
  listPolls: () => void
}

declare type AppState = {
  fetchStatus: 'UNSENT' | 'LOADING' | 'DONE',
  polls: Poll[]
}
