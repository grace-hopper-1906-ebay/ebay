const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router
const Sequelize = require('sequelize')

router.get('/:id', async (req, res, next) => {
  try {
    const user = req.session.passport ? req.session.passport.user : undefined
    if (user && parseInt(req.params.id) === req.session.passport.user) {
      const orders = await Order.findAll({
        where: {
          userId: parseInt(req.params.id)
        }
      })
      res.json(orders)
    } else {
      res.json('You do not have access to this page')
    }
  } catch (err) {
    next(err)
  }
})
