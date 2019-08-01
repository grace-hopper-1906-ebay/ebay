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
      <div>
        <Row>
          <Col>Wands</Col>
        </Row>
        <Row>
          {products.map(product => (
            <Col sm={4} key={product.id}>
              <img src={product.image} />
              <Link to={`single-product/${product.id}`} key={product.id}>
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
    products: state.allProducts.products
  }
}

const mapDispatchToProps = dispatch => {
  return {getProducts: () => dispatch(getProducts())}
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
