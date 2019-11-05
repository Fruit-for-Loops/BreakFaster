import axios from 'axios'

// ACTION TYPES
const GOT_ORDERS = 'GET_ORDERS'

// ACTION CREATORS

const gotOrders = orders => ({
  type: GOT_ORDERS,
  orders
})

// THUNK CREATORS
export const createOrder = order => async dispatch => {
  await axios.post('/api/order', order)
  const {data} = await axios.get('/api/orders')
  dispatch(gotOrders(data))
}

export const getOrders = () => async dispatch => {
  const {data} = await axios.get('/api/orders')
  dispatch(gotOrders(data))
}

// REDUCER
const initialState = {
  orders: []
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ORDERS:
      return {...state, orders: action.orders}
    default:
      return state
  }
}

export default rootReducer
