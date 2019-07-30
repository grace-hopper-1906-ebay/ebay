const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  content: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
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
