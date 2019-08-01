import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class orderConfirmation extends Component {
  componentDidMount() {}
  render() {
    return (
      <div>
        <h3>Order Placed!!</h3>
        <p>Order Number: {this.props.orderNumber}</p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {orderNumber: state.cart.orderNumber}
}

export default connect(mapStateToProps)(orderConfirmation)
