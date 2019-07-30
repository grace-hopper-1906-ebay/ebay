import React, {Component} from 'react'
import {connect} from 'react-redux'
// import SingleProduct from './SingleProduct'
import {getProducts} from '../reducers/productsReducer'

class AllProducts extends Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    // make sure products belongs to this.props and matches the name
    const {products} = this.props.products
    return (
      <div>
        <p>Wands</p>
        {products.map(product => (
          <SingleProduct key={product.id} product={product} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {getProducts: () => dispatch(getProducts())}
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
// export default AllProductsConnect
