const router = require('express').Router()
const {Product, User} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    if (req.user.admin) {
      res.json(product)
    } else {
      res.send('You do not have access to this page')
    }
  } catch (err) {
    next(err)
  }
})
