import React from 'react'
import { shallow } from 'enzyme'
import Input from '../input'

it('renders as input when type is text', () => {
  const tree = shallow(<Input type="text" />)
  expect(tree.find('input').exists()).toBe(true)
})

it('renders as input when type is number', () => {
  const tree = shallow(<Input type="number" />)
  expect(tree.find('input').exists()).toBe(true)
})

it('renders as textarea', () => {
  const tree = shallow(<Input type="textarea" />)
  expect(tree.find('textarea').exists()).toBe(true)
})

it('uses a given className', () => {
  const className = 'something'
  const tree = shallow(<Input type="text" className={className} />)
  expect(tree.find('input').hasClass(className)).toBe(true)
})
