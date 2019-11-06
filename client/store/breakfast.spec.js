/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {getAllBreakfasts, getSingleBreakfast} from './breakfast'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {
    allBreakfasts: [],
    singleBreakfast: {}
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getAllBreakfasts', () => {
    it('eventually dispatches the GOT ALL BREAKFASTS action', async () => {
      const fakeBreakfast = {name: 'Cheerios'}
      mockAxios.onGet('/api/breakfasts').replyOnce(200, fakeBreakfast)
      await store.dispatch(getAllBreakfasts())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_ALL_BREAKFASTS_SUCCESSFULLY')
      expect(actions[0].breakfasts).to.be.deep.equal(fakeBreakfast)
    })
  })

  describe('getSingleBreakfast', () => {
    it('eventually dispatches the GOT SINGLE BREAKFAST action', async () => {
      const fakeBreakfast = {name: 'Cheerios'}
      mockAxios.onGet('/api/breakfast/1').replyOnce(200, fakeBreakfast)
      await store.dispatch(getSingleBreakfast(1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_SINGLE_BREAKFAST')
      expect(actions[0].breakfast).to.be.deep.equal(fakeBreakfast)
    })
  })
})
