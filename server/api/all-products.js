const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    if (req.user.admin) {
      res.json(products)
    } else {
      res.send('You do not have access to this page')
    }
  } catch (error) {
    next(error)
  }
})
