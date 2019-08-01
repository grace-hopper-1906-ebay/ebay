import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const PLACE_ORDER = 'PLACE_ORDER'

/**
 * INITIAL STATE
 */
const cart = {
  cart: []
}

/**
 * ACTION CREATORS
 */
const gotCart = cart => ({type: GET_CART, cart})
const deletedFromCart = cart => ({type: DELETE_FROM_CART, cart})
const addToCart = cart => ({type: ADD_TO_CART, cart})
const placedOrder = cart => ({type: PLACE_ORDER, cart})

/**
 * THUNK CREATORS
 */

export const getCart = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/cart`)
    dispatch(gotCart(data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteFromCart = id => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/cart/delete/${id.id}`)
    dispatch(deletedFromCart(data))
  } catch (err) {
    console.error(err)
  }
}

export const addProductToCart = id => async dispatch => {
  try {
    const {data} = await axios.post(`/api/cart/add`, id)
    dispatch(addToCart(data))
  } catch (err) {
    console.error(err)
  }
}

export const placeOrder = () => async dispatch => {
  try {
    const {data} = await axios.put('/api/cart/place-order')
    dispatch(placedOrder(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = cart, action) {
  switch (action.type) {
    case GET_CART:
      return {...state, cart: action.cart}
    case DELETE_FROM_CART:
      return {...state, cart: action.cart}
    case ADD_TO_CART:
      return {...state, cart: action.cart}
    case PLACE_ORDER:
      return {...state, cart: action.cart}
    default:
      return state
  }
}
