import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_CART = 'GOT_CART'
/**
 * INITIAL STATE
 */

/**
 * ACTION CREATORS
 */
const gotCart = cart => ({type: GOT_CART, cart})

/**
 * THUNK CREATORS
 */
export const getCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/carts')
    dispatch(gotCart(data))
  } catch (error) {
    console.log(error)
  }
}

export const updateStock = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/carts')
    const cartArr = data.cart.cart
    await cartArr.forEach(async breakfast => {
      let quantity = breakfast.cartItem.quantity
      let currentStock = breakfast.stock
      let newStock = currentStock - quantity
      await axios.put(`/breakfasts/${breakfast.id}`, newStock)
    })
  } catch (error) {
    console.log(error)
  }
}

export const newPurchase = cartId => async dispatch => {
  try {
    await axios.put(`/api/carts/${cartId}`)
    const {data} = await axios.get('/api/carts')
    dispatch(gotCart(data))
  } catch (error) {
    console.log(error)
  }
}

export const addToCart = breakfast => async dispatch => {
  try {
    await axios.post('/api/carts', breakfast)
    const {data} = await axios.get('/api/carts')
    dispatch(gotCart(data))
  } catch (error) {
    console.log(error)
  }
}

export const removeItemFromCart = breakfast => async dispatch => {
  try {
    console.log('breakfast:', breakfast)
    await axios.delete(`/api/carts/${breakfast.id}`)
    const {data} = await axios.get('/api/carts')
    dispatch(gotCart(data))
  } catch (error) {
    console.log(error)
  }
}

export const increaseQuantity = breakfast => async dispatch => {
  try {
    await axios.put(`/api/carts/increase`, breakfast)
    const {data} = await axios.get('/api/carts')
    dispatch(gotCart(data))
  } catch (error) {
    console.log(error)
  }
}

export const decreaseQuantity = breakfast => async dispatch => {
  await axios.put(`/api/carts/decrease`, breakfast)
  const {data} = await axios.get('/api/carts')
  dispatch(gotCart(data))
}

const initialState = {
  cart: []
}
/**
 * REDUCER
 */
// NEED TO UPDATE ONCE BACKEND WRITTEN
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_CART:
      return {...state, cart: action.cart}
    default:
      return state
  }
}
