import axios from 'axios'

//ACTION TYPES

const ALL_PRODUCTS = 'ALL_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

//INITIAL STATE

const initialState = {
  product: {},
  products: []
}

//ACTION CREATORS

const gotProducts = products => ({
  type: ALL_PRODUCTS,
  products
})

const getSingleProduct = product => ({type: GET_SINGLE_PRODUCT, product})

//THUNK CREATORS

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

export const fetchSingleProduct = productId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/single-product/${productId}`)
    dispatch(getSingleProduct(data))
  } catch (err) {
    console.error(err)
  }
}

//REDUCER

export default function(state = initialState, action) {
  switch (action.type) {
    case ALL_PRODUCTS:
      return {...state, products: action.products}
    case GET_SINGLE_PRODUCT:
      return {...state, product: action.product}
    default:
      return state
  }
}
