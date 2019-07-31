import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct, addProductToCart} from '../store'

/**
 * COMPONENT
 */
class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
  }

  addToCart = () => {
    this.props.addProductToCart({id: this.props.match.params.productId})
  }

  render() {
    return (
      <div>
        <div>
          <img src={this.props.image} />
        </div>
        <div>
          <h3>{this.props.name}</h3>
          <p>{this.props.description}</p>
          <p>${this.props.price}</p>
          <button onClick={this.addToCart}>Add To Cart</button>
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
    name: state.singleProduct.product.name,
    price: state.singleProduct.product.price,
    description: state.singleProduct.product.description,
    image: state.singleProduct.product.image,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleProduct: productId => dispatch(fetchSingleProduct(productId)),
    addProductToCart: productId => dispatch(addProductToCart(productId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
