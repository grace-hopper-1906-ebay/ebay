const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

// router.use('/singleProduct', require('./singleProduct'))
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {id: req.params.id}
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})
