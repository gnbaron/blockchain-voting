import React from 'react'
import { shallow } from 'enzyme'
import MessageBox from '../message-box'

it('renders a error message box', () => {
  const tree = shallow(<MessageBox type="error">some error</MessageBox>)
  expect(tree.hasClass('error')).toBe(true)
})

it('renders a warning message box', () => {
  const tree = shallow(<MessageBox type="warning">some warning</MessageBox>)
  expect(tree.hasClass('warning')).toBe(true)
})

it('renders a success message box', () => {
  const tree = shallow(<MessageBox type="success">some win</MessageBox>)
  expect(tree.hasClass('success')).toBe(true)
})

it('renders using a given className', () => {
  const className = 'something'
  const tree = shallow(<MessageBox className={className}>message</MessageBox>)
  expect(tree.hasClass(className)).toBe(true)
})
