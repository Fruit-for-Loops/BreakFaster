import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_CART = 'GOT_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const UPDATED_QUANTITY = 'UPDATED_QUANTITY'
/**
 * INITIAL STATE
 */

/**
 * ACTION CREATORS
 */
const gotCart = cart => ({type: GOT_CART, cart})
const addedToCart = cartItem => ({type: ADD_TO_CART, cartItem})
const updatedQuantity = cartItem => ({type: UPDATED_QUANTITY, cartItem})
const removedFromCart = cartItem => ({type: DELETE_FROM_CART, cartItem})

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
    const {data} = await axios.post('/api/carts', breakfast)
    dispatch(addedToCart(data))
  } catch (error) {
    console.log(error)
  }
}

export const removeItemFromCart = breakfast => async dispatch => {
  try {
    const response = await axios.delete(`/api/carts/${breakfast.id}`)
    console.log('response', response)
    dispatch(removedFromCart(response.data))
  } catch (error) {
    console.log(error)
  }
}

export const increaseQuantity = breakfast => async dispatch => {
  try {
    const response = await axios.put(`/api/carts/increase`, breakfast)
    dispatch(updatedQuantity(response.data))
  } catch (error) {
    console.log(error)
  }
}

export const decreaseQuantity = breakfast => async dispatch => {
  try {
    const response = await axios.put(`/api/carts/decrease`, breakfast)
    dispatch(updatedQuantity(response.data))
  } catch (error) {
    console.log(error)
  }
}

const initialState = {
  cart: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_CART:
      return {...state, cart: action.cart}
    case ADD_TO_CART:
      return {...state, cart: [...state.cart, action.cartItem]}
    case UPDATED_QUANTITY:
      let newCart = state.cart.map(item => {
        if (item.id === action.cartItem[0].id) {
          return action.cartItem[0]
        } else {
          return item
        }
      })
      return {...state, cart: newCart}
    case DELETE_FROM_CART:
      let updatedCart = state.cart.filter(item => {
        return item.id !== action.cartItem[0].id
      })
      return {...state, cart: updatedCart}
    default:
      return state
  }
}
