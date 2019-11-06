/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Breakfast} from './breakfast'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Breakfast', () => {
  let breakfast
  let breakfastData = {
    name: 'Cheerios',
    pictureUrl:
      'https://target.scene7.com/is/image/Target/GUEST_cfecc8db-c5ca-46c6-bea1-89fcaad393e2?wid=325&hei=325&qlt=80&fmt=webp',
    price: 10.0
  }

  beforeEach(() => {
    breakfast = shallow(<Breakfast breakfast={breakfastData} />)
  })

  it('has access to props of breakfast item', () => {
    expect(
      breakfast
        .find('p')
        .at(0)
        .text()
    ).to.be.equal('Cheerios')
    expect(
      breakfast
        .find('p')
        .at(1)
        .text()
    ).to.be.equal('$10')
  })
})
