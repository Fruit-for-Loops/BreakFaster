/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureMockStore from 'redux-mock-store'
import AllBreakfasts from './allBreakfasts'
import {Provider} from 'react-redux'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('All Breakfasts', () => {
  let breakfasts
  let breakfastData = [
    {
      name: 'Cheerios',
      pictureUrl:
        'https://target.scene7.com/is/image/Target/GUEST_cfecc8db-c5ca-46c6-bea1-89fcaad393e2?wid=325&hei=325&qlt=80&fmt=webp',
      price: 10.0
    },
    {
      name: 'Fruit For Loops',
      pictureUrl:
        'https://target.scene7.com/is/image/Target/GUEST_cfecc8db-c5ca-46c6-bea1-89fcaad393e2?wid=325&hei=325&qlt=80&fmt=webp',
      price: 11.0
    }
  ]

  beforeEach(() => {
    const mockStore = configureMockStore()
    let store = mockStore({breakfast: {allBreakfasts: breakfastData}})
    breakfasts = shallow(<AllBreakfasts breakfast={breakfastData} />)
  })

  xit('has access to each breakfast item', () => {
    expect(breakfasts.props().children.props.breakfasts[0].name).to.be.equal(
      'Cheerios'
    )
    expect(breakfasts.props().children.props.breakfasts[1].name).to.be.equal(
      'Fruit For Loops'
    )
  })

  xit('renders a list item for each breakfast item in state', () => {
    expect(breakfasts.render().find('li').length).to.be.equal(2)
  })
})
