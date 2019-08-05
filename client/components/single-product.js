import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct, addProductToCart} from '../store'
import {Row, Col} from 'react-bootstrap'

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
    if (this.props.name) {
      return (
        <div className="body">
          <Row>
            <Col />
            <Col>
              <img className="product-image" src={this.props.image} />
            </Col>
            <Col />
          </Row>
          <Row>
            <Col />
            <Col>
              <h3>{this.props.name}</h3>
            </Col>
            <Col />
          </Row>
          <Row>
            <Col />
            <Col>
              <p>{this.props.description}</p>
            </Col>
            <Col />
          </Row>
          <Row>
            <p>${this.props.price}</p>
          </Row>
          <Row>
            <button type="submit" onClick={this.addToCart}>
              Add To Cart
            </button>
          </Row>
        </div>
      )
    } else {
      return (
        <div className="body">
          <Row className="error-info">
            <Col />
            <Col xs={10}>
              <h1 className="centering">
                the page requested has been erased from memory
              </h1>
            </Col>
            <Col />
          </Row>
          <Row className="error-pic">
            <Col />
            <Col>
              <img
                id="error"
                src="https://data.whicdn.com/images/94242698/original.gif"
              />
            </Col>
            <Col />
          </Row>
        </div>
      )
    }
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  if (state.products.product) {
    return {
      product: state.products.product,
      name: state.products.product.name,
      price: state.products.product.price,
      description: state.products.product.description,
      image: state.products.product.image,
      isLoggedIn: !!state.user.id
    }
  } else {
    return {
      product: state.products.product
    }
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleProduct: productId => dispatch(fetchSingleProduct(productId)),
    addProductToCart: productId => dispatch(addProductToCart(productId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
