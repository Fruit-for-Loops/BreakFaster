const router = require('express').Router()
const {Cart, Breakfast, CartItem} = require('../db/models')
const Sequelize = require('sequelize')

module.exports = router

router.get('/', async (req, res, next) => {
  console.log(req.session.cartId)
  const cartSessionId = req.session.cartId
  const id = req.user.id
  try {
    if (!cartSessionId) {
      let newCart
      if (id) {
        newCart = await Cart.create({
          userId: id
        })
      } else {
        newCart = await Cart.create({})
      }
      req.session.cartId = newCart.id
      const breakfasts = newCart.getBreakfasts()
      res.json(breakfasts)
    } else {
      const currentCart = await Cart.findByPk(cartSessionId)
      const breakfasts = currentCart.getBreakfasts()
      res.json(breakfasts)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const currentCart = await Cart.findByPk(req.session.cartId)
    const currentBreakfast = await Breakfast.findByPk(req.body.breakfastId)
    currentCart.addBreakfast(currentBreakfast)
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

router.put('/increase', async (req, res, next) => {
  try {
    await CartItem.update(
      {
        quantity: Sequelize.literal('quantity + 1')
      },
      {
        where: {
          breakfastId: req.body.breakfastId,
          cartId: req.session.cartId
        },
        returning: true,
        plain: true
      }
    )
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.put('/increase', async (req, res, next) => {
  try {
    await CartItem.update(
      {
        quantity: Sequelize.literal('quantity - 1')
      },
      {
        where: {
          breakfastId: req.body.breakfastId,
          cartId: req.session.cartId
        },
        returning: true,
        plain: true
      }
    )
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    const currentCart = await Cart.findByPk(req.session.cartId)
    const currentBreakfast = await Breakfast.findByPk(req.body.breakfastId)
    currentCart.remove(currentBreakfast)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
