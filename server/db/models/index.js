const User = require('./user')
const Breakfast = require('./breakfast')
const Address = require('./address')
const Cart = require('./cart')
const CartItem = require('./cartItem')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

// User.belongsTo(Address, {
//   as: 'shippingAddress',
//   foreignKey: 'shipping'
// })

// User.belongsTo(Address, {
//   as: 'billingAddress',
//   foreignKey: 'billing'
// })

// Address.hasMany(User)

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
