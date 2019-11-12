const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  purchased: {
    type: Sequelize.DATE
  }
})

Cart.handleExistingUserCart = async user => {
  let currentCart
  if (user) {
    currentCart = await Cart.findOrCreate({
      where: {
        userId: user.id,
        purchased: null
      }
    })
    if (currentCart[0].id) {
      currentCart = currentCart[0]
    }
  } else {
    currentCart = await Cart.create({purchased: null})
  }
  return currentCart
}

module.exports = Cart
