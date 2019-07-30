/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchSingleProduct} from './single-product'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creator', () => {
  let store
  let mockAxios

  const initialState = {product: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getProduct', () => {
    it('eventually dispatches the GET_SINGLE_PRODUCT action', async () => {
      const fakeWand = {
        name: 'Vine Wand',
        price: 60,
        description:
          'Size: 10 3/4 inches\nWood: Vine\nCore: Dragon Heartstring',
        image: 'https://bit.ly/2K33xM8'
      }
      const id = 1
      mockAxios.onGet(`/api/single-product/${id}`).replyOnce(200, fakeWand)
      await store.dispatch(fetchSingleProduct(id))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_SINGLE_PRODUCT')
      expect(actions[0].product).to.be.deep.equal(fakeWand)
    })
  })
})
