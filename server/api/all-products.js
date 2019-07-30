const router = require('express').Router()
const {AllProducts} = require('../db/models')
module.exports = router

router.get('/products', async (req, res, next) => {
  try {
    const products = await AllProducts.findAll()
    res.json(products)
  } catch (error) {
    next(error)
  }
})
