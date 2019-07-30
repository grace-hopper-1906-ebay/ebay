import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getProducts} from '../store/all-products'

class AllProducts extends Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const products = this.props.products
    if (products) {
      return (
        <div>
          <p>Wands</p>
          {products.map(product => (
            <Link to={`single-product/${product.id}`} key={product.id}>
              {product.name}
            </Link>
          ))}
        </div>
      )
    } else return <div>no products</div>
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
