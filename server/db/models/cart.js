const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  purchased: {
    type: Sequelize.DATE
  }
})

Cart.getOrMakeCart = async user => {
  let currentCart
  //check if a user is logged in
  if (user) {
    //if so, either find their current cart (where purchased in null),
    //or make a new cart for them with their user id on it
    currentCart = await Cart.findOrCreate({
      where: {
        userId: user.id,
        purchased: null
      }
    })
    //if it did a "find", it returned an array with one item
    //for consistency, we want an object, so reassign current
    //cart to the first item in the array, which is our
    //current cart object
    if (currentCart[0].id) {
      currentCart = currentCart[0]
    }
  } else {
    //if no user is logged in, make a new guest cart, no user attached
    currentCart = await Cart.create({purchased: null})
  }
  return currentCart
}

module.exports = Cart
