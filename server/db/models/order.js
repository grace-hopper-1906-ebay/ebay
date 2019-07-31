const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  products: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: false
  },
  orderNumber: {
    type: Sequelize.INTEGER
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
