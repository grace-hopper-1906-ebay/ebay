const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./all-products'))
router.use('/single-product', require('./single-product'))
router.use('/cart', require('./cart'))
router.use('/place-order', require('./place-order'))
router.use('/order-confirmation', require('./order-confirmation'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
