import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router'
import {deleteFromCart, getCart, placeOrder} from '../store'
import {Row, Col, Button} from 'react-bootstrap'

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
    const total = cart
      .map(item => Number(item.product.price * item.quantity))
      .reduce((acc, cur) => {
        return acc + cur
      }, 0)
    let disablePlaceOrder
    if (cart.length === 0) {
      disablePlaceOrder = true
    } else {
      disablePlaceOrder = false
    }
    return (
      <div className="body">
        <Row>
          <Col />
          <Col>
            <h3 className="color">Cart!!</h3>
          </Col>
          <Col />
        </Row>
        {cart.map((item, index) => (
          <div key={index}>
            <Row>
              <img src={item.product.image} />
            </Row>
            <Row>
              <p className="color">{item.product.name}</p>
            </Row>
            <Row>
              <p className="color">{item.product.price}</p>
            </Row>
            <Row>
              <p className="color">quantity: {item.quantity}</p>
            </Row>
            <Row>
              <Button
                onClick={() => this.props.deleteFromCart(item.product.id)}
              >
                Delete from cart
              </Button>
            </Row>
          </div>
        ))}
        <p>Order Total: ${total}</p>
        <Col />
        <Button
          disabled={disablePlaceOrder}
          onClick={this.handleOrderPlacement}
        >
          Place Order!!
        </Button>
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
    deleteFromCart: id => dispatch(deleteFromCart(id)),
    placeOrder: () => dispatch(placeOrder())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
