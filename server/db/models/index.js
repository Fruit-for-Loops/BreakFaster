const User = require('./user')
const Breakfast = require('./breakfast')
const Address = require('./address')
const Cart = require('./cart')
const CartItem = require('./cartItem')

Cart.belongsTo(User)
User.hasMany(Cart)

Cart.belongsToMany(Breakfast, {through: 'cartItem'})
Breakfast.belongsToMany(Cart, {through: 'cartItem'})

module.exports = {
  User,
  Breakfast,
  Address,
  Cart,
  CartItem
}
