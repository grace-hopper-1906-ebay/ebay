const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: 'Description Coming Soon!'
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: 'https://bit.ly/2YvaltZ'
  }
})

module.exports = Product

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
