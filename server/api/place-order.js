const router = require('express').Router()
const {User, Order} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const user = req.session.passport ? req.session.passport.user : undefined
    if (user) {
      const curUser = await User.findByPk(user)
      const cart = [...curUser.cart]
      const orderNum = Math.floor(user * Math.random() * 10000000)
      const orderDetails = {
        products: cart,
        orderNumber: orderNum,
        userId: user
      }
      const newOrder = await Order.create(orderDetails)
      res.json(newOrder)
    } else {
      let cart = [...req.session.cart]
      const orderNum = Math.floor(Math.random() * 10000000)
      const orderDetails = {
        products: cart,
        orderNumber: orderNum
      }
      const newOrder = await Order.create(orderDetails)
      res.json(newOrder)
    }
  } catch (err) {
    next(err)
  }
})
