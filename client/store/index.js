import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import allProducts from './all-products'
import singleProduct from './single-product'
import cart from './cart'
import placeOrder from './place-order'
import orderConfirmation from './order-confirmation'

const reducer = combineReducers({
  user,
  allProducts,
  singleProduct,
  cart,
  placeOrder,
  orderConfirmation
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './all-products'
export * from './single-product'
export * from './cart'
export * from './place-order'
export * from './order-confirmation'
