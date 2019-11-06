import axios from 'axios'
const GET_CART = 'GET_CART'
const gotCart = cart => ({
  type: GET_CART,
  cart
})
export const getCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/auth/carts')
    dispatch(gotCart(data))
  } catch (err) {
    console.error(err)
  }
}
const defaultCart = {}
export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    default:
      return state
  }
}
