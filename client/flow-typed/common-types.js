// @flow
declare type Proposal = {
  id: number,
  description: string
}

declare type Poll = {
  id: number,
  closed: boolean,
  description: string,
  proposals: Proposal[]
}

declare type AppActions = {
  castVote: (token: string, pollId: number, proposalId: number) => Promise<*>,
  closePoll: (id: number) => Promise<*>,
  createPoll: (
    description: string,
    options: string[],
    tokens: string[]
  ) => Promise<*>,
  listPolls: () => void
}

declare type AppState = {
  fetchStatus: 'UNSENT' | 'LOADING' | 'DONE',
  polls: Poll[]
}
