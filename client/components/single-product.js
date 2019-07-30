import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {fetchSingleProduct} from '../store/single-product'

/**
 * COMPONENT
 */
class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id)
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
    name: state.singleProduct.name,
    price: state.singleProduct.price,
    description: state.singleProduct.description,
    image: state.singleProduct.image
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleProduct: productId => dispatch(fetchSingleProduct(productId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)

/**
 * PROP TYPES
 */
SingleProduct.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  description: PropTypes.string,
  image: PropTypes.string
}
