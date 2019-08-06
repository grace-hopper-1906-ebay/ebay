import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct, addProductToCart} from '../store'
import {Row, Col, Button} from 'react-bootstrap'
import ErrorPage from './error'
import {Link} from 'react-router-dom'
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
            <Col sm={{span: 4, offset: 4}}>
              <img className="product-image" src={this.props.image} />
            </Col>
          </Row>
          <Row>
            <Col sm={{span: 4, offset: 4}}>
              <h3 className="color">{this.props.name}</h3>
            </Col>
          </Row>
          <Row>
            <Col sm={{span: 7, offset: 4}}>
              <p className="color">{this.props.description}</p>
            </Col>
          </Row>
          <Row>
            <Col sm={{span: 4, offset: 4}}>
              <p className="color">${this.props.price}</p>
            </Col>
          </Row>
          <Row>
            <Col sm={{span: 4, offset: 4}}>
              <Button type="submit" onClick={this.addToCart}>
                Add To Cart
              </Button>
            </Col>
          </Row>
          <Row>
            <Col sm={{span: 4, offset: 1}}>
              <Link className="link" to="/products">
                Back to Wands
              </Link>
            </Col>
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
