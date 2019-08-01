const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  orderNumber: {
    type: Sequelize.INTEGER
  }
})

module.exports = Cart

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
