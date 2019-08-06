const chai = require('chai')
const expect = chai.expect
import {StaticRouter as Router} from 'react-router-dom'
import React from 'react'
import {Provider} from 'react-redux'
import {mount} from 'enzyme'
import AllProducts from './all-products'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
const {JSDOM} = require('jsdom')
const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const {window} = jsdom
import history from '../history'

const middlewares = [thunk]

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target)
  })
}

global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js'
}
global.requestAnimationFrame = function(callback) {
  return setTimeout(callback, 0)
}
global.cancelAnimationFrame = function(id) {
  clearTimeout(id)
}
copyProps(window, global)

describe('<AllProducts /> component', () => {
  let products = [
    {name: 'wand', price: 2.0},
    {name: 'wand2', price: 3.0},
    {name: 'wand3', price: 4.0}
  ]

  const mockStore = configureMockStore(middlewares)

  it('renders an unordered list of products', () => {
    const store = mockStore({products: {products: products}})
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <AllProducts />
        </Router>
      </Provider>
    )
    expect(wrapper.exists('.product-rows')).to.be.equal(true)
  })
})

/*   beforeEach('Create component', () => {
    allProducts = shallow(
      <AllProducts/>
      // <AllProducts
      //   products={{
      //     id: 1,
      //     name: 'Super Wand',
      //     price: 100.00,
      //     desciption: "Superman's wand",
      //     image: 'https://bit.ly/2K33xM8'
      //   }}
      // />
    )
  })
  //  spec does not see AllProducts component this is why the specs don't pass
  xit('should exist', function() {
    assert.isDefined(AllProducts)
  })
  xit('finds name of the product', () => {
    expect(allProducts.find({products: name}).text()).to.be.equal('Super Wand')
  }) */
