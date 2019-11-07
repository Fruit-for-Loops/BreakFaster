import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_CART = 'GOT_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const UPDATED_QUANTITY = 'UPDATED_QUANTITY'

/**
 * INITIAL STATE
 */

/**
 * ACTION CREATORS
 */
const gotCart = cart => ({type: GOT_CART, cart})
const addedToCart = cart => ({type: ADD_TO_CART, cart})
const removeFromCart = breakfastId => ({type: REMOVE_FROM_CART, breakfastId})
const updatedQuantity = breakfast => ({type: UPDATED_QUANTITY, breakfast})
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

export const addToCart = breakfastId => async dispatch => {
  try {
    await axios.post('/api/carts', breakfastId)
    const {data} = await axios.get('/api/carts')
    dispatch(gotCart(data))
  } catch (error) {
    console.log(error)
  }
}

export const removeItemFromCart = breakfastId => async dispatch => {
  try {
    await axios.delete('/api/carts', breakfastId)
    const {data} = await axios.get('/api/carts')
    dispatch(gotCart(data))
  } catch (error) {
    console.log(error)
  }
}

export const increaseQuantity = breakfastId => async dispatch => {
  await axios.put(`/api/carts/increase`, breakfastId)
  const {data} = await axios.get('/api/carts')
  dispatch(gotCart(data))
}

export const decreaseQuantity = breakfastId => async dispatch => {
  await axios.put(`/api/carts/decrease`, breakfastId)
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
