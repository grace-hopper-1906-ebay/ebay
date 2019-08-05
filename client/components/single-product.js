import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct, addProductToCart} from '../store'
import {Row, Col, Button} from 'react-bootstrap'
import ErrorPage from './error'
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
    console.log('product', this.props.product)
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
            <Col />
            <Col>
              <p>${this.props.price}</p>
            </Col>
            <Col />
          </Row>
          <Row>
            <Col />
            <Col>
              <Button type="submit" onClick={this.addToCart}>
                Add To Cart
              </Button>
            </Col>
            <Col />
          </Row>
        </div>
      )
    } else {
      return <ErrorPage />
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
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleProduct: productId => dispatch(fetchSingleProduct(productId)),
    addProductToCart: productId => dispatch(addProductToCart(productId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
