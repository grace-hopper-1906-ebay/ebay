const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('column definitions and validations', () => {
    it('has a `name`, `image`, `description`, `price`', async () => {
      const product = await Product.create({
        name: 'Super Wand',
        price: 10.0
      })

      expect(product.name).to.equal('Super Wand')
      expect(Number(product.price)).to.equal(10.0)

      expect(product.dataValues).to.have.all.keys(
        'id',
        'name',
        'image',
        'description',
        'price',
        'createdAt',
        'updatedAt'
      )
    })

    it('includes `name` and `price` fields', () => {
      const product = Product.build()
      return product.validate().then(
        () => {
          throw new Error('Validation should fail if no name')
        },
        err => {
          expect(err).to.be.an('error')
        }
      )
    })
  })
})
