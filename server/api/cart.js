const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

//getting cart data
router.get('/', async (req, res, next) => {
  try {
    const user = req.session.passport ? req.session.passport.user : undefined
    if (user) {
      const curUser = await User.findByPk(user)
      const cart = [...curUser.cart]
      //{product:quantity}
      let quantityCart = {}
      for (let i = 0; i < cart.length; i++) {
        if (Object.keys(quantityCart).includes(String(cart[i]))) {
          quantityCart[cart[i]]++
        } else {
          quantityCart[cart[i]] = 1
        }
      }
      res.json(quantityCart)
    } else {
      let cart = [...req.session.cart]
      let quantityCart = {}
      for (let i = 0; i < cart.length; i++) {
        if (Object.keys(quantityCart).includes(cart[i])) {
          quantityCart[cart[i]]++
        } else {
          quantityCart[cart[i]] = 1
        }
      }
      res.json(quantityCart)
    }
  } catch (error) {
    next(error)
  }
})

//removing item from cart
router.put('/delete', async (req, res, next) => {
  try {
    const user = req.session.passport ? req.session.passport.user : undefined
    if (user) {
      const curUser = await User.findByPk(user)
      let cart = [...curUser.cart]
      const item = req.body.id
      cart.splice(cart.indexOf(item), 1)
      const updatedCart = await curUser.update({cart: cart})
      res.json(updatedCart)
    } else {
      let cart = [...req.session.cart]
      const item = req.body.id
      cart.splice(cart.indexOf(item), 1)
      req.session.cart = cart
      res.json(req.session.cart)
    }
  } catch (err) {
    next(err)
  }
})

//add to cart
router.put('/add', async (req, res, next) => {
  try {
    const userData = req.session.passport
      ? req.session.passport.user
      : undefined
    if (userData) {
      const curUser = await User.findByPk(userData)
      let cart = [...curUser.cart]
      cart.push(req.body.id)
      const updatedCart = await curUser.update({cart: cart})
      res.json(updatedCart)
    } else {
      let cart = [...req.session.cart]
      cart.push(req.body.id)
      req.session.cart = cart
      res.json(req.session.cart)
    }
  } catch (err) {
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
