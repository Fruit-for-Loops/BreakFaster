const router = require('express').Router()
const {Cart} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  const id = req.user.id
  try {
    if (!id) {
      const guestCart = await Cart.findOne({
        where: {
          id: id
        }
      })
      res.json(guestCart)
    } else {
      const userCart = await Cart.findOne({
        where: {
          userId: id
        }
      })
      res.json(userCart)
    }
  } catch (err) {
    next(err)
  }
})
