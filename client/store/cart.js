import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_CART = 'GOT_CART'

/**
 * INITIAL STATE
 */
const initialState = {
  cart: {}
}

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

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_CART:
      return action.cart
    default:
      return state
  }
}
