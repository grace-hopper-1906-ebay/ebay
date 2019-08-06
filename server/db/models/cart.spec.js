const {expect} = require('chai')
const db = require('../index')
const Cart = db.model('cart')

describe('Cart model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('column definitions and validations', () => {
    it('has a `quantity`', async () => {
      const cart = await Cart.create({
        quantity: 1
      })

      expect(cart.quantity).to.equal(1)
    })
  })
})
