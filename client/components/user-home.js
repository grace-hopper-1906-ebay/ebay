import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchOrderHistory} from '../store'
import {Row, Col} from 'react-bootstrap'

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
      <div className="body">
        <Row>
          <Col sm={10} className="margins">
            <h1 className="color center">Welcome, {user.email}!</h1>
          </Col>
        </Row>
        <Row>
          <Col sm={2} className="margins center">
            <h2 className="color center">Order History:</h2>
            {orderHistory.length === 0 ? (
              <p className="color center">No Orders Placed!</p>
            ) : (
              <ul className="center">
                {orderHistory.map((order, index) => (
                  <li key={index} className="color center">
                    Order: {order.orderNumber}
                  </li>
                ))}
              </ul>
            )}
          </Col>
        </Row>
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
    orderHistory: state.cart.orderHistory
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
