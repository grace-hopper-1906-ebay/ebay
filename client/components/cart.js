import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {deleteFromCart, getCart, getProducts} from '../store'

class Cart extends Component {
  componentDidMount() {
    this.props.getProducts()
    this.props.getCart()
  }

  // matchCartToproducts(object){
  //     // let itemInCart = [];
  //     // for( let key in object){
  //     //     itemInCart.push(this.props.products[key-1])
  //     // }
  // }

  matchingItems(key) {
    for (let product in this.props.products) {
      if (this.props.products[product].id === key) {
        return this.props[product]
      }
    }
  }

  render() {
    const cart = this.props.cart
    const cartItems = cart.map(item => this.matchingItems(item))
    return (
      <div>
        <p>Do we see that page?</p>

        {cartItems.map(item => (
          <div>
            <img src={item.image} />
            <p>{item.name}</p>
            <p>{item.desciption}</p>
            <p>{item.price}</p>
            <button onClick={() => this.deleteFromCart(item.id)}>
              Delete from cart
            </button>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: cart,
    products: products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: () => dispatch(getCart()),
    deleteFromCart: () => dispatch(deleteFromCart(item.id)),
    getProducts: () => dispatch(getProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
