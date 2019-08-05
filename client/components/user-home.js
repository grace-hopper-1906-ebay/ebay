import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchOrderHistory} from '../store'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  componentDidMount() {
    const {user} = this.props
    this.props.fetchOrderHistory(user.id)
  }

  render() {
    const {user, orderHistory} = this.props
    return (
      <div>
        <div>
          <h3>Welcome, {user.email}!</h3>
          <h2>Order History</h2>
          {orderHistory.length === 0 ? (
            <p>No Orders Placed!</p>
          ) : (
            <ul>
              {orderHistory.map((order, index) => (
                <li key={index}>Order: {order.orderNumber}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    orderHistory: state.orderHistory.orderHistory
  }
}

const mapDispatch = dispatch => {
  return {
    fetchOrderHistory: userId => dispatch(fetchOrderHistory(userId))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
