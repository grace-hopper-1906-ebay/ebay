const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const data = await Order.findAll()
    res.json(data[data.length - 1])
  } catch (err) {
    next(err)
  }
})
