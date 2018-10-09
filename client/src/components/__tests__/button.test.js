import React from 'react'
import { shallow } from 'enzyme'
import Button from '../button'

it('uses a given className', () => {
  const className = 'something'
  const tree = shallow(<Button className={className} />)
  expect(tree.find('button').hasClass(className)).toBe(true)
})
