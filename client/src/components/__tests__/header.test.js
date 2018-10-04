import React from 'react'
import { shallow } from 'enzyme'
import Header from '../header'

it('renders a link to home', () => {
  const tree = shallow(<Header />)
  expect(tree.find('Link').prop('to')).toBe('/')
})

it('renders app title', () => {
  const tree = shallow(<Header />)
  expect(tree.find('.title').text()).toBe('Blockchain Voting')
})
