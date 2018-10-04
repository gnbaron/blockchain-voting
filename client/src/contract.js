// @flow
import truffleContract from 'truffle-contract'
import { getWeb3 } from './utils'
import VotingContract from './contracts/Voting.json'

const toAscii = web3 => value => {
  return web3.utils.toAscii(value).replace(/\u0000/g, '')
}

const fromAscii = web3 => value => {
  const { fromAscii } = web3.utils
  return fromAscii(value)
}

export type Contract = {
  instance: any,
  web3: any
}

export async function getContract(): Promise<Contract> {
  // Get network provider and web3 instance.
  const web3 = await getWeb3()

  // Get the contract instance.
  const contract = truffleContract(VotingContract)
  contract.setProvider(web3.currentProvider)
  const instance = await contract.deployed()

  return { instance, web3 }
}

export function createPoll(
  contract: Contract,
  description: string,
  options: string[],
  tokens: string[]
): Promise<*> {
  const { instance, web3 } = contract
  return instance.createPoll(
    fromAscii(web3)(description),
    options.map(fromAscii(web3)),
    tokens.map(fromAscii(web3))
  )
}

// export function castVote(instance, token, pollIndex, proposalIndex) {
//   instance.castVote(fromAscii(token), pollIndex, proposalIndex)
// }

// export async function listPolls(instance) {
//   const length = await instance.getPollsMapSize()
//   const polls = []
//   for (let i = 0; i < length.valueOf(); i++) {
//     polls.push(getPoll(instance, i))
//   }
//   return Promise.all(polls)
// }

// async function getPoll(instance, index) {
//   const [description, proposalsCount] = await instance.getPoll(index)
//   return {
//     index,
//     description: toAscii(description),
//     proposals: await getProposals(instance, index, proposalsCount)
//   }
// }

// function getProposals(instance, pollIndex, count) {
//   const proposals = []
//   for (let i = 0; i < count.valueOf(); i++) {
//     proposals.push(getProposal(instance, pollIndex, i))
//   }
//   return Promise.all(proposals)
// }

// async function getProposal(instance, pollIndex, index) {
//   const data = await instance.getProposal(pollIndex, index)
//   return {
//     index,
//     description: toAscii(data)
//   }
// }
