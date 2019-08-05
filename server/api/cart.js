const router = require('express').Router()
const {Order, Cart, Product} = require('../db/models')
module.exports = router

//getting cart data
router.get('/', async (req, res, next) => {
  try {
    const user = req.session.passport ? req.session.passport.user : undefined
    let cart
    if (user) {
      cart = await Cart.findAll({
        include: [Product],
        where: {userId: user, orderId: null}
      })
    } else {
      cart = [...req.session.cart]
    }
    if (req.user.admin) {
      res.json(cart)
    } else {
      res.send('You do not have access to this page')
    }
  } catch (error) {
    next(error)
  }
})

//removing item from cart
router.delete('/delete/:id', async (req, res, next) => {
  try {
    const user = req.session.passport ? req.session.passport.user : undefined
    if (user) {
      await Cart.destroy({
        where: {
          productId: parseInt(req.params.id),
          userId: user,
          orderId: null
        }
      })
      res.json({id: parseInt(req.params.id)})
    } else {
      res.json({id: parseInt(req.params.id)})
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
        where: {userId: user, orderId: null}
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
                orderId: null,
                productId: parseInt(req.body.id)
              }
            }
          )
          const item = await Cart.findOne({
            include: [Product],
            where: {
              userId: user,
              orderId: null,
              productId: parseInt(req.body.id)
            }
          })
          res.json(item)
          return
        }
      }
      const newCartItem = {userId: user, productId: parseInt(req.body.id)}
      await Cart.create(newCartItem)
      const item = await Cart.findOne({
        include: [Product],
        where: {
          userId: user,
          orderId: null,
          productId: parseInt(req.body.id)
        }
      })
      res.json(item)
    } else {
      let cart = [...req.session.cart]
      for (let i = 0; i < cart.length; i++) {
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
      const order = await Order.create({orderNumber: orderNumber, userId: user})
      await Cart.update(
        {orderId: order.id},
        {where: {userId: user, orderId: null}}
      )
      res.json({cart: [], orderNumber})
    } else {
      const cart = [...req.session.cart]
      const orderNumber = Math.floor(Math.random() * 10000000)
      const order = await Order.create({orderNumber: orderNumber})
      cart.forEach(async item => {
        const orderedItem = {
          orderId: order.id,
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
