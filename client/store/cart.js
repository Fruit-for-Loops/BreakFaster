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
const addToCart = cart => ({type: ADD_TO_CART, cart})
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

export const addItemToCart = breakfastId => async dispatch => {
  try {
    const {data} = await axios.post('/api/carts', breakfastId)
    dispatch(addToCart(data))
  } catch (error) {
    console.log(error)
  }
}

export const removeItemFromCart = breakfastId => async dispatch => {
  try {
    const {data} = await axios.delete('/api/carts', breakfastId)
    dispatch(removeFromCart(data))
  } catch (error) {
    console.log(error)
  }
}

export const increaseQuantity = breakfastId => async dispatch => {
  const {data} = await axios.put(`/api/carts/increase`, breakfastId)
  dispatch(updatedQuantity(data))
}

export const decreaseQuantity = breakfastId => async dispatch => {
  const {data} = await axios.put(`/api/carts/decrease`, breakfastId)
  dispatch(updatedQuantity(data))
}

/**
 * REDUCER
 */
// NEED TO UPDATE ONCE BACKEND WRITTEN
export default function(cart = [], action) {
  switch (action.type) {
    case GOT_CART:
      return action.cart
    case ADD_TO_CART:
      return action.cart
    case REMOVE_FROM_CART:
      return cart
    case UPDATED_QUANTITY:
      return cart
    default:
      return cart
  }
}
