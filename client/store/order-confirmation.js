import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ORDER_NUMBER = 'GET_ORDER_NUMBER'

/**
 * INITIAL STATE
 */
const order = {
  order: {}
}

/**
 * ACTION CREATORS
 */
const gotOrderNumber = order => ({type: GET_ORDER_NUMBER, order})

/**
 * THUNK CREATORS
 */

export const getOrderNumber = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/order-confirmation`)
    dispatch(gotOrderNumber(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = order, action) {
  switch (action.type) {
    case GET_ORDER_NUMBER:
      return {...state, order: action.order}
    default:
      return state
  }
}
