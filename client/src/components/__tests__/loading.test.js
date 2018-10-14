import React from 'react'
import { shallow } from 'enzyme'
import Loading from '../loading'

it('renders using a default color', () => {
  const tree = shallow(<Loading />)
  expect(tree.find('Loading').prop('color')).toBe('#443854')
})

it('renders using a provided color', () => {
  const WHITE = '#FFF'
  const tree = shallow(<Loading color={WHITE} />)
  expect(tree.find('Loading').prop('color')).toBe(WHITE)
})
