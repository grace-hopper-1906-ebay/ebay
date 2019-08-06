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
      <div className="cart">
        <Row>
          <Col sm={{span: 10, offset: 3}}>
            <h1 className="color">Welcome, {user.email}!</h1>
          </Col>
        </Row>
        <Row>
          <Col sm={{span: 2, offset: 4}}>
            <h2 className="color">Order History:</h2>
            {orderHistory.length === 0 ? (
              <p className="color">No Orders Placed!</p>
            ) : (
              <ul>
                {orderHistory.map((order, index) => (
                  <li key={index} className="color">
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
