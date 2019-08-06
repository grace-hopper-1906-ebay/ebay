const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('column definitions and validations', () => {
    it('has a `orderNumber`', async () => {
      const order = await Order.create({
        orderNumber: 43627
      })

      expect(order.orderNumber).to.equal(43627)
    })
  })
})
