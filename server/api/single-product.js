const router = require('express').Router()
const {Product, User} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const userData = req.session.passport
      ? req.session.passport.user
      : undefined
    if (userData) {
      const curUser = await User.findByPk(userData)
      let cart = [...curUser.cart]
      cart.push(req.params.id)
      const updatedCart = await curUser.update({cart: cart})
      res.json(updatedCart)
    } else {
      let cart = [...req.session.cart]
      cart.push(req.params.id)
      req.session.cart = cart
      res.json(req.session.cart)
    }
  } catch (err) {
    next(err)
  }
})
