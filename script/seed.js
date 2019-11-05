'use strict'

const db = require('../server/db')
const {User, Item, Address, Cart} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Katey',
      lastName: 'Phillips',
      isAdmin: true,
      email: 'kateyphi@gmail.com'
    }),
    User.create({
      firstName: 'Alexa',
      lastName: 'King',
      isAdmin: true,
      email: 'alexaking@gmail.com'
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

  const items = await Promise.all([
    Item.create({
      name: 'Full English Breakfast',
      price: 15.99,
      stock: 100,
      description: 'Ya got eggs, sausage, baked beans, some other stuff'
    }),
    Item.create({
      name: 'Tofu Scramble Slam',
      price: 10.99,
      stock: 100,
      description:
        'This vegan breakfast includes tofu scramble, hash browns, and vegan sausage',
      tags: ['vegetarian', 'vegan']
    })
  ])

  const carts = await Promise.all([
    Cart.create({
      items: [1, 1, 1, 2, 2, 2, 2, 2],
      purchased: new Date()
    }),
    Cart.create({
      items: [2, 2, 1, 1, 1, 1],
      purchased: new Date(),
      userId: 1
    })
  ])
  console.log(
    `seeded ${users.length} users, ${addresses.length} addresses, ${
      carts.length
    } carts, and ${items.length} items`
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
