import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

/**
 * COMPONENT
 */
export const SingleProduct = props => {
  // const {name, price, description, image} = props //product has name, price, description, image
  const name = 'Elder Wand'
  const price = '20'
  const description = "it's powerful"
  const image =
    'https://shop.universalorlando.com/images/L-Interactive-Ollivanders-Elder-Wand-1272549.JPG'
  return (
    <div>
      <div>
        <img src={image} />
      </div>
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
        <p>${price}</p>
        <button>Add To Cart</button>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
// const mapState = state => {
//   return {
//     name: state.product.name,
//     price: state.product.price,
//     description: state.product.description,
//     image: state.product.image
//   }
// }

// export default connect(mapState)(SingleProduct)

/**
 * PROP TYPES
 */
// SingleProduct.propTypes = {
//   name: PropTypes.string,
//   price: PropTypes.number,
//   description: PropTypes.string,
//   image: PropTypes.string
// }
