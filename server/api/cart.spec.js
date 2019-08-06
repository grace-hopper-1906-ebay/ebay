const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
// const agent = require('supertest')(app);
const Cart = db.model('cart')
const Product = db.model('product')
const User = db.model('user')
describe('Cart route', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('/', () => {
    beforeEach(async () => {
      const fakeUser = await User.create({
        id: 2,
        email: 'kittyKat@gmail.com',
        password: 'hfjsprjknv',
        salt: 'jhgeruinferuvnrupq',
        googleId: '375642',
        admin: true
      })
      const fakeProduct = await Product.create({
        id: 13,
        name: 'Magic Wand',
        price: 32.22,
        description: 'Real magic wand, can move objects and do simple tricks',
        image: 'https://bit.ly/2YxkVwK'
      })
      const fakeOrder = await Cart.create({
        id: 1,
        quantity: 1,
        orderNumber: 123,
        userId: fakeUser.id,
        productId: fakeProduct.id
      })
      // return (
    })
    xit('GET / ', async () => {
      let cookie = Buffer.from(JSON.stringify({count: 2})).toString('base64')
      const res = await request(app)
        .set('cookie', ['my-session=' + cookie])
        .get('/api/cart/')
        .expect(200)
      console.log('this is res.body', res.body)
      expect(res.body).to.be.an('array')
      expect(res.body[0].quantity).to.be.equal(1)
      //expect(res.body[0].orderNumber).to.be.equal(123)
    })
  })
})
