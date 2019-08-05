import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ORDER_HISOTRY = 'GET_ORDER_HISOTRY'

/**
 * INITIAL STATE
 */
const orderHistory = {
  orderHistory: []
}

/**
 * ACTION CREATORS
 */
const getOrderHistory = orderHistory => ({
  type: GET_ORDER_HISOTRY,
  orderHistory
})

/**
 * THUNK CREATORS
 */

export const fetchOrderHistory = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/order-history/${userId}`)
    dispatch(getOrderHistory(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = orderHistory, action) {
  switch (action.type) {
    case GET_ORDER_HISOTRY:
      return {...state, orderHistory: action.orderHistory}
    default:
      return state
  }
}
