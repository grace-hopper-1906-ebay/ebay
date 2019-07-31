import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {deleteFromCart, getCart, getProducts} from '../store'

class Cart extends Component {
  componentDidMount() {
    this.props.getCart()
    this.props.getProducts()
  }

  matchingItems(key, products) {
    for (let product in products) {
      if (String(products[product].id) === key) {
        return products[product]
      }
    }
  }

  render() {
    const cart = this.props.cart
    const cartItems = Object.keys(cart).map(item =>
      this.matchingItems(item, this.props.products)
    )
    return (
      <div>
        <p>Cart!!</p>

        {cartItems.map(item => (
          <div key={item.id}>
            <img src={item.image} />
            <p>{item.name}</p>
            <p>{item.desciption}</p>
            <p>{item.price}</p>
            <button onClick={() => this.props.deleteFromCart(item.id)}>
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
    cart: state.cart.cart,
    products: state.allProducts.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: () => dispatch(getCart()),
    deleteFromCart: id => dispatch(deleteFromCart({id: id})),
    getProducts: () => dispatch(getProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
