const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  orderNumber: {
    type: Sequelize.INTEGER
  },
  totalPrice: {
    type: Sequelize.DECIMAL(10, 2)
  }
})

module.exports = Order

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
