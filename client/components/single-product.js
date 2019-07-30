import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/single-product'

/**
 * COMPONENT
 */
class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
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
          <button>Add To Cart</button>
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
    image: state.singleProduct.product.image
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleProduct: productId => dispatch(fetchSingleProduct(productId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
