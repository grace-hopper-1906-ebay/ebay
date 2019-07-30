/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Single Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/single-product/:id', () => {
    const hermione = {
      name: 'Holly Wand',
      price: 199.99,
      description: 'Size: 11 inches\nWood: Holly\nCore: Phoenix Feather',
      image: 'https://bit.ly/2YxkVwK'
    }

    beforeEach(() => {
      return Product.create(hermione)
    })

    it('GET /api/single-product/:id', async () => {
      const res = await request(app)
        .get('/api/single-product/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('Holly Wand')
    })
  }) // end describe('/api/single-product/:id')
}) // end describe('Single Product routes')
