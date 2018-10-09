import React from 'react'
import { shallow } from 'enzyme'
import StepNav from '../step-nav'

const defaults = {
  active: 'step1',
  steps: ['step1', 'step2', 'step3']
}

it('renders multiple steps', () => {
  const tree = shallow(<StepNav {...defaults} />)
  expect(tree.find('.step')).toHaveLength(3)
})

it('renders active step highlighted', () => {
  const tree = shallow(<StepNav {...defaults} active={defaults.steps[1]} />)
  expect(
    tree
      .find('.step')
      .at(1)
      .hasClass('active')
  ).toBe(true)
})

it('renders first step highlighted by default', () => {
  const tree = shallow(<StepNav {...defaults} active={undefined} />)
  expect(
    tree
      .find('.step')
      .first()
      .hasClass('active')
  ).toBe(true)
})
