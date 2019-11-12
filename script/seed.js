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
      pictureUrl:
        'https://i2.wp.com/metro.co.uk/wp-content/uploads/2017/08/fe.jpg?quality=90&strip=all&zoom=1&resize=644%2C338&ssl=1',
      description: 'Ya got eggs, sausage, baked beans, some other stuff'
    }),
    Breakfast.create({
      name: 'Tofu Scramble Slam',
      price: 1099,
      stock: 100,
      pictureUrl:
        'https://lovingitvegan.com/wp-content/uploads/2018/03/Vegan-Tofu-Scramble-11.jpg',
      description:
        'This vegan breakfast includes tofu scramble, hash browns, and vegan sausage',
      tags: ['vegetarian', 'vegan']
    }),
    Breakfast.create({
      name: 'Gluten Free Pancake Slam',
      price: 1200,
      stock: 100,
      pictureUrl:
        'https://www.kingarthurflour.com/sites/default/files/recipe_legacy/48-3-large.jpg',
      description:
        'This gluten free breakfast includes pancakes, eggs, hash browns, and sausage.'
    }),
    Breakfast.create({
      name: 'Fruit Loops',
      price: 1200,
      stock: 100,
      pictureUrl:
        'https://cdn3.volusion.com/xntm3.7bebc/v/vspfiles/photos/FO75-2T.png?v-cache=1553348453',
      description: 'Breakfast of champions.'
    }),
    Breakfast.create({
      name: 'Breakfast Sandwich',
      price: 1300,
      stock: 100,
      pictureUrl:
        'https://www.oliviascuisine.com/wp-content/uploads/2016/07/ny-bacon-egg-cheese-sandwich.jpg',
      description: 'New yawk Bacon Egg an cheese'
    }),
    Breakfast.create({
      name: 'Fruit Salad',
      price: 1300,
      stock: 100,
      pictureUrl:
        'https://sweetphi.com/wp-content/uploads/2019/03/How-to-make-an-instagram-worthy-fruit-bowl-2-720x720.jpg',
      description: 'Daily dose of fruit'
    }),
    Breakfast.create({
      name: 'Mimosas',
      price: 1000,
      stock: 100,
      pictureUrl:
        'https://www.lemontreedwelling.com/wp-content/uploads/2019/02/Irish-Mimosa-2-1.jpg',
      description: `It's 5 o'clock somewhere`
    }),
    Breakfast.create({
      name: 'Coffee',
      price: 500,
      stock: 100,
      pictureUrl:
        'https://cdn-image.foodandwine.com/sites/default/files/1568907144/Coffee-National-Coffee-Day-FT-Blog0919.jpg',
      description: 'To get you going'
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
