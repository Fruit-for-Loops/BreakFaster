import axios from 'axios'
import {
  getAllBreakfasts,
  GOT_ALL_BREAKFASTS,
  gotAllBreakfasts
} from './breakfast'
/**
 * ACTION TYPES
 */
const GOT_CART = 'GOT_CART'
const ADD_TO_CART = 'ADD_TO_CART'
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
    console.log('thunk data:', data)
    dispatch(addedToCart(data))
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
    const response = await axios.put(`/api/carts/increase`, breakfast)
    console.log('increasequantity thunk data:', response)
    dispatch(updatedQuantity(response.data))
  } catch (error) {
    console.log(error)
  }
}

export const decreaseQuantity = breakfast => async dispatch => {
  try {
    await axios.put(`/api/carts/decrease`, breakfast)
    const {data} = await axios.get('/api/carts')
    dispatch(gotCart(data))
  } catch (error) {
    console.log(error)
  }
}

const initialState = {
  cart: [],
  breakfasts: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_BREAKFASTS:
      return {...state, breakfasts: action.breakfasts}
    case GOT_CART:
      return {...state, cart: action.cart}
    case ADD_TO_CART:
      return {...state, cart: [...state.cart, action.cartItem]}
    case UPDATED_QUANTITY:
      console.log('oldCart:', state.cart)
      let newCart = state.cart.map(item => {
        if (item.id === action.cartItem[0].id) {
          return action.cartItem[0]
        } else {
          return item
        }
      })
      console.log('newCart:', newCart)
      return {...state, cart: newCart}
    default:
      return state
  }
}
