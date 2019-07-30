import axios from 'axios'

const ALL_PRODUCTS = 'ALL_PRODUCTS'

const gotProducts = products => ({
  type: ALL_PRODUCTS,
  products
})

export const getProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`api/products`)
      dispatch(gotProducts(data))
    } catch (error) {
      console.log('Something went wrong: ', error)
    }
  }
}

const initialState = {
  products: [],
  product: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ALL_PRODUCTS:
      return {...state, products: action.products}
    default:
      return state
  }
}
