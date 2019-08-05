/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('All products route', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const fakeWandName = 'Vine Wand'
    const fakeWandPrice = '60.00'

    beforeEach(() => {
      return Product.create({
        name: fakeWandName,
        price: fakeWandPrice
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(fakeWandName)
      expect(res.body[0].price).to.be.equal(fakeWandPrice)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
