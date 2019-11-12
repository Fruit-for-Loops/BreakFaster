const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  purchased: {
    type: Sequelize.DATE
  }
})

Cart.handleExistingUserCart = async userId => {
  let currentCart = await Cart.findOrCreate({
    where: {
      userId: userId,
      purchased: null
    }
  })
  if (currentCart[0].id) {
    currentCart = currentCart[0]
  }
  return currentCart
}

module.exports = Cart
