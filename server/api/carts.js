const router = require('express').Router()
const {Cart} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (!req.session.userId) {
      const guestCart = await Cart.findOne({
        where: {
          id: req.session.cartId
        }
      })
      res.json(guestCart)
    } else {
      const userCart = await Cart.findOne({
        where: {
          userId: req.session.userId
        }
      })
      res.json(userCart)
    }
  } catch (err) {
    next(err)
  }
})
