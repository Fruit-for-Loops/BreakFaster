/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {
  increaseQuantity,
  decreaseQuantity,
  getCart,
  removeItemFromCart,
  addItemToCart
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
  let currentCart

  const initialState = {
    cart: []
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
    currentCart = [
      {
        id: 1,
        name: 'Tofu Scramble Slam',
        price: 10,
        stock: 4,
        cartItem: {
          quantity: 1,
          currentPrice: 10,
          cartId: 1,
          breakfastId: 1
        }
      }
    ]
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('Cart functions', () => {
    it('adds a new item to the cart', async () => {
      mockAxios.onGet('/api/carts').replyOnce(200, currentCart)
      mockAxios.onPost('/api/carts', 1).replyOnce(201)
      await store.dispatch(addItemToCart(1))
      let state = store.getState()
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('ADD_TO_CART')
      expect(state.cart).to.be.equal(currentCart)
    })

    it('gets items from a cart', async () => {
      mockAxios.onGet('/api/carts').replyOnce(200, currentCart)
      await store.dispatch(getCart())
      let state = store.getState()
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_CART')
      expect(state.cart).to.be.equal(currentCart)
    })

    it('eventually dispatches the UPDATED QUANTITY action', async () => {
      mockAxios.onPut('/api/carts/increase').replyOnce(204)
      await store.dispatch(increaseQuantity(1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('UPDATED_QUANTITY')
    })

    it('eventually dispatches the UPDATED QUANTITY action', async () => {
      mockAxios.onPut('/api/carts/decrease').replyOnce(204)
      await store.dispatch(decreaseQuantity(1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('UPDATED_QUANTITY')
    })

    it('removes an item from the cart', async () => {
      mockAxios.onGet('/api/carts').reply(200, currentCart)
      await store.dispatch(getCart())
      let state = store.getState()
      let cartLength = state.cart.length
      mockAxios.onDelete('/api/carts', 1).replyOnce(204)
      await store.dispatch(removeItemFromCart(1))
      state = store.getState()
      const newCartLength = state.cart.length
      expect(newCartLength).to.be.equal(cartLength - 1)
    })
  })
})
