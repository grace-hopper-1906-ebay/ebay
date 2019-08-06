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
        <Row className="center">
          <Col sm={4} className="center">
            <h3 className="color center">Cart</h3>
          </Col>
        </Row>
        <Row className="center">
          {cart.map((item, index) => (
            <Col key={index} sm={4}>
              <img className="center" src={item.product.image} />
              <p className="color center">{item.product.name}</p>
              <p className="color center">{item.product.price}</p>
              <p className="color">quantity: {item.quantity}</p>
              <Button
                onClick={() => this.props.deleteFromCart(item.product.id)}
              >
                Delete from cart
              </Button>
            </Col>
          ))}
        </Row>
        <Row>
          <Col sm={{span: 4, offset: 5}}>
            <h4 className="color">Order Total: ${total}</h4>
          </Col>
        </Row>
        <div className="center">
          <Button
            disabled={disablePlaceOrder}
            onClick={this.handleOrderPlacement}
          >
            Place Order
          </Button>
        </div>
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
