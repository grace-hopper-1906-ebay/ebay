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
  cart: [],
  orderNumber: null
}

/**
 * ACTION CREATORS
 */
const gotCart = cart => ({type: GET_CART, cart})
const deletedFromCart = item => ({type: DELETE_FROM_CART, item})
const addToCart = item => ({type: ADD_TO_CART, item})
const placedOrder = payload => ({type: PLACE_ORDER, payload})

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
    const {data} = await axios.delete(`/api/cart/delete/${id}`)
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
      let cartDel = [...state.cart]
      const keysDel = cartDel.map(item => item.product.id)
      const removeIndex = keysDel.indexOf(action.item.id)
      cartDel.splice(removeIndex, 1)
      return {...state, cart: cartDel}
    case ADD_TO_CART:
      let cartAdd = [...state.cart]
      const keysAdd = cartAdd.map(item => item.product.id)
      if (keysAdd.includes(action.item.product.id)) {
        const index = keysAdd.indexOf(action.item.product.id)
        cartAdd[index] = action.item
      } else {
        cartAdd.push(action.item)
      }
      console.log('afteradding', cartAdd)
      return {...state, cart: cartAdd}
    case PLACE_ORDER:
      return {
        ...state,
        cart: action.payload.cart,
        orderNumber: action.payload.orderNumber
      }
    default:
      return state
  }
}
