import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router'
import {deleteFromCart, getCart, placingOrder} from '../store'

class Cart extends Component {
  componentDidMount() {
    this.props.getCart()
  }

  handleOrderPlacement = () => {
    this.props.placingOrder()
    this.props.history.push('/order-confirmation')
  }

  render() {
    const cart = this.props.cart
    console.log(cart)

    return (
      <div>
        <p>Cart!!</p>

        {cart.map((item, index) => (
          <div key={index}>
            <img src={item.product.image} />
            <p>{item.product.name}</p>
            <p>{item.product.price}</p>
            <p>{item.product.id}</p>
            <button onClick={() => this.props.deleteFromCart(item.product.id)}>
              Delete from cart
            </button>
          </div>
        ))}
        <button onClick={this.handleOrderPlacement}>Place Order!!</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    cart: state.cart.cart,
    orderNumber: state.placeOrder.order.number
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: () => dispatch(getCart()),
    deleteFromCart: id => dispatch(deleteFromCart({id: id})),
    placingOrder: () => dispatch(placingOrder())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
