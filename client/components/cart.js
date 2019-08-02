import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router'
import {deleteFromCart, getCart, placeOrder} from '../store'

class Cart extends Component {
  componentDidMount() {
    this.props.getCart()
  }

  handleOrderPlacement = () => {
    this.props.placeOrder()
    this.props.history.push('/order-confirmation')
  }

  render() {
    const cart = this.props.cart
    let disablePlaceOrder
    if (cart.length === 0) {
      disablePlaceOrder = true
    } else {
      disablePlaceOrder = false
    }
    console.log(disablePlaceOrder)
    return (
      <div>
        <p>Cart!!</p>

        {cart.map((item, index) => (
          <div key={index}>
            <img src={item.product.image} />
            <p>{item.product.name}</p>
            <p>{item.product.price}</p>
            <p>quantity: {item.quantity}</p>
            <button onClick={() => this.props.deleteFromCart(item.product.id)}>
              Delete from cart
            </button>
          </div>
        ))}
        <button
          disabled={disablePlaceOrder}
          onClick={this.handleOrderPlacement}
        >
          Place Order!!
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
    orderNumber: state.cart.orderNumber
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: () => dispatch(getCart()),
    deleteFromCart: id => dispatch(deleteFromCart({id: id})),
    placeOrder: () => dispatch(placeOrder())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
