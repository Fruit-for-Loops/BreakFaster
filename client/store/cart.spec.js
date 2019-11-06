/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {increaseQuantity, decreaseQuantity} from './cart'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {
    cart: []
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('increaseQuantity', () => {
    it('eventually dispatches the UPDATED QUANTITY action', async () => {
      mockAxios.onPut('/api/carts/increase').replyOnce(204)
      await store.dispatch(increaseQuantity(1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('UPDATED_QUANTITY')
    })
  })

  describe('decreaseQuantity', () => {
    it('eventually dispatches the UPDATED QUANTITY action', async () => {
      mockAxios.onPut('/api/carts/decrease').replyOnce(204)
      await store.dispatch(decreaseQuantity(1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('UPDATED_QUANTITY')
    })
  })
})
