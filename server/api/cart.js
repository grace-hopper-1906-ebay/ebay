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
        where: {userId: user, orderNumber: null}
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
        where: {
          productId: parseInt(req.params.id),
          userId: user,
          orderNumber: null
        }
      })
      const cart = await Cart.findAll({
        include: [Product],
        where: {userId: user, orderNumber: null}
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
      const cart = await Cart.findAll({
        include: [Product],
        where: {userId: user, orderNumber: null}
      })
      //check if item is already in user's cart
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].productId === parseInt(req.body.id)) {
          //in cart
          let quant = cart[i].quantity
          quant++
          await Cart.update(
            {quantity: quant},
            {
              where: {
                userId: user,
                orderNumber: null,
                productId: parseInt(req.body.id)
              }
            }
          )
          const data = await Cart.findAll({
            include: [Product],
            where: {userId: user, orderNumber: null}
          })
          res.json(data)
          return
        }
      }
      const newCartItem = {userId: user, productId: parseInt(req.body.id)}
      await Cart.create(newCartItem)
      const data = await Cart.findAll({
        include: [Product],
        where: {userId: user, orderNumber: null}
      })
      res.json(data)
    } else {
      let cart = [...req.session.cart]
      for (let i = 0; i < cart.length; i++) {
        console.log('single cart item', cart[i])
        if (cart[i].product.id === parseInt(req.body.id)) {
          cart[i].quantity++
          req.session.cart = cart
          res.json(req.session.cart)
          return
        }
      }
      const product = await Product.findByPk(req.body.id)
      cart.push({quantity: 1, product: product})
      req.session.cart = cart
      res.json(req.session.cart)
    }
  } catch (err) {
    console.log('error')
    next(err)
  }
})

//after placing order, give products in cart order number
router.put('/place-order', async (req, res, next) => {
  try {
    const user = req.session.passport ? req.session.passport.user : undefined
    if (user) {
      const orderNumber = Math.floor(user * Math.random() * 10000000)
      await Cart.update(
        {orderNumber: orderNumber},
        {where: {userId: user, orderNumber: null}}
      )
      const cart = await Cart.findAll({
        include: [Product],
        where: {userId: user, orderNumber: null}
      })
      res.json({cart: cart, orderNumber})
    } else {
      const cart = [...req.session.cart]
      const orderNumber = Math.floor(Math.random() * 10000000)
      cart.forEach(async item => {
        const orderedItem = {
          orderNumber: orderNumber,
          productId: item.product.id,
          quantity: item.quantity
        }
        await Cart.create(orderedItem)
      })
      req.session.cart = []
      res.json({cart: req.session.cart, orderNumber})
    }
  } catch (err) {
    next(err)
  }
})
