const router = require('express').Router()
const {Cart, Breakfast, CartItem} = require('../db/models')
const Sequelize = require('sequelize')

module.exports = router

router.get('/', async (req, res, next) => {
  const cartSessionId = req.session.cartId
  try {
    let currentCart
    if (!cartSessionId) {
      if (req.user) {
        currentCart = await Cart.findOrCreate({
          userId: req.user.id,
          purchased: null
        })
      } else {
        currentCart = await Cart.create({purchased: null})
      }
      req.session.cartId = currentCart.id
    } else {
      currentCart = await Cart.findByPk(cartSessionId)
    }
    const breakfasts = await currentCart.getBreakfasts()
    res.json(breakfasts)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const currentCart = await Cart.findByPk(req.session.cartId)
    const currentBreakfast = await Breakfast.findByPk(req.body.breakfastId)
    await currentCart.addBreakfast(currentBreakfast)
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

router.put('/decrease', async (req, res, next) => {
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
    await currentCart.removeBreakfast(currentBreakfast)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
