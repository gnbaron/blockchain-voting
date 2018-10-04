import React from 'react'
import { shallow } from 'enzyme'
import Loading from '../loading'

it('renders using a default color', () => {
  const tree = shallow(<Loading />)
  expect(tree.find('Loading').prop('color')).toBe('#000')
})

it('renders using a provided color', () => {
  const RED = '#FFF'
  const tree = shallow(<Loading color={RED} />)
  expect(tree.find('Loading').prop('color')).toBe(RED)
})
