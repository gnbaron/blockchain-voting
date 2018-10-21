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

declare type PollResults = Array<{ proposal: number, votes: number }>

declare type AppActions = {|
  castVote: (token: string, pollId: number, proposalId: number) => Promise<*>,
  closePoll: (id: number) => Promise<*>,
  createPoll: (
    description: string,
    options: string[],
    tokens: string[]
  ) => Promise<*>,
  fetchPolls: () => void,
  fetchResults: (poll: Poll) => void
|}

declare type FetchState = 'UNSENT' | 'LOADING' | 'DONE'

declare type AppState = {|
  fetchStatus: FetchState,
  polls: Poll[],
  results: {
    [id: number]: PollResults
  }
|}
