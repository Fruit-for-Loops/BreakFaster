// ACTION TYPES
import axios from 'axios'

// ACTION TYPES
export const GOT_ALL_BREAKFASTS = 'GOT_ALL_BREAKFASTS_SUCCESSFULLY'
const GOT_SINGLE_BREAKFAST = 'GOT_SINGLE_BREAKFAST'

// ACTION CREATORS
export const gotAllBreakfasts = breakfasts => ({
  type: GOT_ALL_BREAKFASTS,
  breakfasts
})

const gotSingleBreakfast = breakfast => ({
  type: GOT_SINGLE_BREAKFAST,
  breakfast
})

// THUNK CREATORS
export const getAllBreakfasts = () => async dispatch => {
  const {data} = await axios.get('/api/breakfasts')
  dispatch(gotAllBreakfasts(data))
}

export const getSingleBreakfast = id => async dispatch => {
  const {data} = await axios.get(`/api/breakfast/${id}`)
  dispatch(gotSingleBreakfast(data))
}

// REDUCER
const initialState = {
  allBreakfasts: [],
  singleBreakfast: {}
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL_BREAKFASTS:
      return {...state, allBreakfasts: action.breakfasts}
    case GOT_SINGLE_BREAKFAST:
      return {...state, singleBreakfast: action.breakfast}
    default:
      return state
  }
}

export default rootReducer
