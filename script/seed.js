'use strict'

const db = require('../server/db')
const {
  User,
  Breakfast,
  Address,
  Cart,
  CartItem
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Katey',
      lastName: 'Phillips',
      isAdmin: true,
      email: 'kateyphi@gmail.com',
      password: '1234'
    }),
    User.create({
      firstName: 'Alexa',
      lastName: 'King',
      isAdmin: true,
      email: 'alexaking@gmail.com',
      password: '1234'
    }),
    User.create({
      firstName: 'Andi',
      lastName: 'Plummer',
      isAdmin: true,
      email: 'andrea@andreaplummer.com',
      password: '1234'
    })
  ])
  const addresses = await Promise.all([
    Address.create({
      line1: '123 main st',
      line2: 'apt 4',
      city: 'Brooklyn',
      state: 'NY',
      zip: 11206
    }),
    Address.create({
      line1: '987 wall st',
      line2: 'penthouse',
      city: 'New York',
      state: 'NY',
      zip: 10005
    })
  ])
  const breakfasts = await Promise.all([
    Breakfast.create({
      name: 'Full English Breakfast',
      price: 1599,
      stock: 100,
      description: 'Ya got eggs, sausage, baked beans, some other stuff'
    }),
    Breakfast.create({
      name: 'Tofu Scramble Slam',
      price: 1099,
      stock: 100,
      description:
        'This vegan breakfast includes tofu scramble, hash browns, and vegan sausage',
      tags: ['vegetarian', 'vegan']
    }),
    Breakfast.create({
      name: 'Cereal',
      price: 5.99,
      stock: 100,
      description: 'Just cheerios in milk.',
      tags: ['vegetarian']
    }),
    Breakfast.create({
      name: 'Gluten Free Pancake Slam',
      price: 12.99,
      stock: 100,
      description:
        'This gluten free breakfast includes pancakes, eggs, hash browns, and sausage.'
    })
  ])
  const carts = await Promise.all([
    Cart.create({
      purchased: new Date(),
      userId: 1
    }),
    Cart.create({
      purchased: null,
      userId: 2
    }),
    Cart.create({
      purchased: new Date(),
      userId: 2
    })
  ])

  const cartItems = await Promise.all([
    CartItem.create({
      quantity: 5,
      currentPrice: 1599,
      breakfastId: 1,
      cartId: 1
    }),
    CartItem.create({
      quantity: 2,
      currentPrice: 1099,
      breakfastId: 2,
      cartId: 2
    })
  ])
  console.log(
    `seeded ${users.length} users, ${addresses.length} addresses, ${
      carts.length
    } carts, ${cartItems.length} cartItems, and ${breakfasts.length} items`
  )
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
