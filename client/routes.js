import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router'
import {
  Login,
  Signup,
  UserHome,
  AllProducts,
  SingleProduct,
  Main,
  Cart,
  OrderConfirmation,
  ErrorPage
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/products" component={AllProducts} />
        <Route
          exact
          path="/single-product/:productId"
          component={SingleProduct}
        />
        <Route path="/cart" component={Cart} />
        <Route path="/order-confirmation" component={OrderConfirmation} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home/:id" component={UserHome} />
          </Switch>
        )}
        <Route component={ErrorPage} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
    // idAdmin: state.user.admin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
