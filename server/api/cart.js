const router = require('express').Router()
const {User, Cart, Product} = require('../db/models')
module.exports = router

//getting cart data
router.get('/', async (req, res, next) => {
  try {
    const user = req.session.passport ? req.session.passport.user : undefined
    if (user) {
      const cart = await Cart.findAll({
        include: [Product],
        where: {userId: user}
      })
      res.json(cart)
    } else {
      let cart = [...req.session.cart]
      res.json(cart)
    }
  } catch (error) {
    next(error)
  }
})

//removing item from cart
router.delete('/delete/:id', async (req, res, next) => {
  try {
    parseInt(req.params.id)
    const user = req.session.passport ? req.session.passport.user : undefined
    if (user) {
      await Cart.destroy({
        where: {productId: parseInt(req.params.id), userId: user}
      })
      const cart = await Cart.findAll({
        include: [Product],
        where: {userId: user}
      })
      res.json(cart)
    } else {
      let cart = [...req.session.cart]
      const filtered = cart.filter(
        item => item.product.id !== parseInt(req.params.id)
      )
      req.session.cart = filtered
      res.json(req.session.cart)
    }
  } catch (err) {
    next(err)
  }
})

//add to cart
router.post('/add', async (req, res, next) => {
  try {
    const user = req.session.passport ? req.session.passport.user : undefined
    if (user) {
      const newCartItem = {userId: user, productId: parseInt(req.body.id)}
      const addToCart = await Cart.create(newCartItem)
      res.json(addToCart)
    } else {
      let cart = [...req.session.cart]
      const product = await Product.findByPk(req.body.id)
      cart.push({product: product})
      req.session.cart = cart
      res.json(req.session.cart)
    }
  } catch (err) {
    console.log('error')
    next(err)
  }
})

//removing item from cart after placing order
router.put('/place-order', async (req, res, next) => {
  try {
    const user = req.session.passport ? req.session.passport.user : undefined
    if (user) {
      const curUser = await User.findByPk(user)
      let cart = []
      const updatedCart = await curUser.update({cart: cart})
      res.json(updatedCart)
    } else {
      let cart = []
      req.session.cart = cart
      res.json(req.session.cart)
    }
  } catch (err) {
    next(err)
  }
})
