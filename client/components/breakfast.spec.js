/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Breakfast from './breakfast'
import configureMockStore from 'redux-mock-store'
import {Provider} from 'react-redux'
// import {spy} from 'sinon'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Breakfast', () => {
  let breakfast
  let breakfastData = {
    name: 'Cheerios',
    pictureUrl:
      'https://target.scene7.com/is/image/Target/GUEST_cfecc8db-c5ca-46c6-bea1-89fcaad393e2?wid=325&hei=325&qlt=80&fmt=webp',
    price: 1000
  }

  beforeEach(() => {
    // let mockStore = configureMockStore()
    // let store = mockStore({})
    // breakfast = shallow(
    //   <Provider store={store}>
    //     <Breakfast breakfast={breakfastData} />
    //   </Provider>
    // )
  })

  xit('has access to props of breakfast item', () => {
    const mockStore = configureMockStore()
    let store = mockStore({
      name: 'Cheerios',
      pictureUrl:
        'https://target.scene7.com/is/image/Target/GUEST_cfecc8db-c5ca-46c6-bea1-89fcaad393e2?wid=325&hei=325&qlt=80&fmt=webp',
      price: 1000
    })
    let wrapper = shallow(<Breakfast store={store} />)
    console.log('WRAPPER', wrapper)
    expect(wrapper.contains('Cherrios')).to.equal(true)
    expect(wrapper.contains(1000)).to.equal(true)
  })

  // it('clicking the add to cart button calls addToCart', () => {
  //   let addToCartSpy = spy()

  // })
})
