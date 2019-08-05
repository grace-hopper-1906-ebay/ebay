/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as Footer} from './footer'
export {default as UserHome} from './user-home'
export {default as Main} from './Main'
export {default as SingleProduct} from './single-product'
export {default as AllProducts} from './all-products'
export {default as Cart} from './cart'
export {default as OrderConfirmation} from './order-confirmation'
export {Login, Signup} from './auth-form'
export {default as ErrorPage} from './error'
