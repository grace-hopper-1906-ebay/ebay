import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

/**
 * INITIAL STATE
 */
const singleProduct = {}

/**
 * ACTION CREATORS
 */
const getSingleProduct = product => ({type: GET_SINGLE_PRODUCT, product})

/**
 * THUNK CREATORS
 */

export const fetchSingleProduct = productId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/single-product/${productId}`)
    dispatch(getSingleProduct(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = singleProduct, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
