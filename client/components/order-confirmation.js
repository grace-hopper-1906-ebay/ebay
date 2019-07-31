import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getOrderNumber} from '../store'

class orderConfirmation extends Component {
  componentDidMount() {
    this.props.getOrderNumber()
  }
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
  return {
    orderNumber: state.orderConfirmation.order.orderNumber
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrderNumber: () => dispatch(getOrderNumber())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(orderConfirmation)
