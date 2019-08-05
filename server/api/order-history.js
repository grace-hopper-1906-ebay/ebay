const router = require('express').Router()
const {Cart} = require('../db/models')
module.exports = router
const Sequelize = require('sequelize')

router.get('/:id', async (req, res, next) => {
  try {
    if (parseInt(req.params.id) === req.session.passport.user) {
      const orders = await Cart.findAll({
        attributes: ['orderNumber'],
        where: {
          userId: parseInt(req.params.id),
          orderNumber: {[Sequelize.Op.ne]: null}
        },
        group: ['orderNumber']
      })
      res.json(orders)
    }
  } catch (err) {
    next(err)
  }
})
