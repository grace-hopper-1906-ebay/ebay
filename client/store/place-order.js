import axios from 'axios'

/**
 * ACTION TYPES
 */
const PLACE_ORDER = 'PLACE_ORDER'

/**
 * INITIAL STATE
 */
const order = {
  order: {}
}

/**
 * ACTION CREATORS
 */
const placeOrder = order => ({type: PLACE_ORDER, order})

/**
 * THUNK CREATORS
 */

export const placingOrder = () => async dispatch => {
  try {
    const {data} = await axios.post(`/api/place-order`)
    await axios.put('/api/cart/place-order')
    dispatch(placeOrder(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = order, action) {
  switch (action.type) {
    case PLACE_ORDER:
      return {...state, order: action.order}
    default:
      return state
  }
}
