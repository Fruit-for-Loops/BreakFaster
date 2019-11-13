/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {
  increaseQuantity,
  decreaseQuantity,
  getCart,
  removeItemFromCart,
  addToCart
} from './cart'
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

  const breakfast = {
    id: 1,
    name: 'Tofu Scramble Slam',
    price: 10,
    stock: 4
  }

  describe('Cart functions', () => {
    it('adds a new item to the cart', async () => {
      mockAxios.onPost('/api/carts').replyOnce(201, breakfast)
      await store.dispatch(addToCart(breakfast))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('ADD_TO_CART')
    })

    it('gets items from a cart', async () => {
      mockAxios.onGet('/api/carts').replyOnce(200)
      await store.dispatch(getCart())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_CART')
    })

    it('eventually dispatches the UPDATED QUANTITY action', async () => {
      mockAxios.onPut('/api/carts/increase').replyOnce(204, breakfast)
      await store.dispatch(increaseQuantity(breakfast))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('UPDATED_QUANTITY')
    })

    it('eventually dispatches the UPDATED QUANTITY action', async () => {
      mockAxios.onPut('/api/carts/decrease').replyOnce(204, breakfast)
      await store.dispatch(decreaseQuantity(breakfast))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('UPDATED_QUANTITY')
    })

    it('removes an item from the cart', async () => {
      mockAxios.onDelete(`/api/carts/${1}`).replyOnce(204, breakfast)
      await store.dispatch(removeItemFromCart(breakfast))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('DELETE_FROM_CART')
    })
  })
})
