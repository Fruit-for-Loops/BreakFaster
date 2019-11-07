const Sequelize = require('sequelize')
const db = require('../db')

const CartItem = db.define('cartItem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  currentPrice: {
    type: Sequelize.INTEGER
  }
})

module.exports = CartItem
