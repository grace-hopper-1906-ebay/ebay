import React from 'react'
import {connect} from 'react-redux'
import {getSingleUser, getCart} from '../store'

/**
 * COMPONENT
 */
class SingleUser extends React.Component {
  componentDidMount() {
    this.props.getSingleUser(this.props.match.params.userId)
  }

  seeOrders = () => {
    this.props.getCart({id: this.props.match.params.orderId})
  }

  render() {
    return (
      <div>
        <div>
          <h3>John Doe( your name)</h3>
        </div>
        <div>
          <h3>{this.props.email}</h3>
          <button onClick={this.seeOrders}>See your orders</button>
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
    //
    email: state.singleUser.email
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: orderId => dispatch(getCart(orderId)),
    getSingleUser: userId => dispatch(getSingleUser(userId))
  }
}

export default connect(mapState, mapDispatch)(SingleUser)
