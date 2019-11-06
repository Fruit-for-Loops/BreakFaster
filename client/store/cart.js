import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_CART = 'GOT_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
/**
 * INITIAL STATE
 */

/**
 * ACTION CREATORS
 */
const gotCart = cart => ({type: GOT_CART, cart})
const addToCart = cart => ({type: ADD_TO_CART, cart})
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

/**
 * REDUCER
 */
export default function(cart = {}, action) {
  switch (action.type) {
    case GOT_CART:
      return action.cart
    case ADD_TO_CART:
      return action.cart
    default:
      return cart
  }
}
