import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const ADD_TO_CART = 'ADD_TO_CART'

/**
 * INITIAL STATE
 */
const singleProduct = {
  product: {}
}

/**
 * ACTION CREATORS
 */
const getSingleProduct = product => ({type: GET_SINGLE_PRODUCT, product})
const addToCart = cart => ({type: ADD_TO_CART, cart})

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

export const addProductToCart = productId => async dispatch => {
  try {
    const {data} = await axios.put(
      `/api/single-product/${productId}`,
      productId
    )
    dispatch(addToCart(data))
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
      return {...state, product: action.product}
    default:
      return state
  }
}
