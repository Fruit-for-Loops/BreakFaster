/* test 2 things:
-pass fxn a user and make sure it returns a cart for that user if it has one, or a new cart if it doesnt
-pass no user, make sure it returns a new cart

*/

const expect = require('chai').expect
const db = require('../db')
const {Cart, User} = require('./index')

describe('Cart', function() {
  // clear the database before all tests
  before(() => {
    return db.sync({force: true})
  })

  // erase all tasks after each spec
  afterEach(() => {
    return db.sync({force: true})
  })

  describe('Class method', function() {
    beforeEach(async () => {
      const newUser = await User.create({email: 'a@b.com', password: '1234'})

      const newCart = await Cart.create()
      console.log(newCart)
      await newCart.setUser(newUser)
    })

    describe('getOrMakeCart', function() {
      it('returns a new cart if the user has no cart', async function() {
        await Cart.getOrMakeCart({id: 2})

        const carts = await Cart.findAll({
          where: {
            userId: 2
          }
        })
        expect(carts).to.have.length(1)
      })
    })
  })
})
