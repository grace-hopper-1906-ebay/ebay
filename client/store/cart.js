import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const ADD_TO_CART = 'ADD_TO_CART'

/**
 * INITIAL STATE
 */
const cart = {
  cart: {}
}

/**
 * ACTION CREATORS
 */
const gotCart = cart => ({type: GET_CART, cart})
const deletedFromCart = cart => ({type: DELETE_FROM_CART, cart})
const addToCart = cart => ({type: ADD_TO_CART, cart})

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
    await axios.put(`/api/cart/delete`, id)
    const {data} = await axios.get(`/api/cart`)
    dispatch(deletedFromCart(data))
  } catch (err) {
    console.error(err)
  }
}

export const addProductToCart = id => async dispatch => {
  try {
    await axios.put(`/api/cart/add`, id)
    const {data} = await axios.get(`/api/cart`)
    dispatch(addToCart(data))
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
    default:
      return state
  }
}
