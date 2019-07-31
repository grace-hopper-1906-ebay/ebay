import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getProducts} from '../store'

class AllProducts extends Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const products = this.props.products
    console.log(this.props)
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
