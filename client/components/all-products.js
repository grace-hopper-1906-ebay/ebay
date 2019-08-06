import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getProducts} from '../store'
import {Row, Col} from 'react-bootstrap'

class AllProducts extends Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const products = this.props.products
    return (
      <div className="body center">
        <Row>
          <Col sm={4}>
            <h1 className="color center">Wands</h1>
          </Col>
        </Row>
        <Row className="product-rows">
          {products.map(product => (
            <Col sm={4} key={product.id} className="product-rows center">
              <img className="all-products-images" src={product.image} />
              <Link
                className="link"
                to={`single-product/${product.id}`}
                key={product.id}
              >
                {'    '}
                {product.name}
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.products
  }
}

const mapDispatchToProps = dispatch => {
  return {getProducts: () => dispatch(getProducts())}
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
