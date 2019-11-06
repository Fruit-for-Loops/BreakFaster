const router = require('express').Router()
const {Cart, Breakfast, CartItem} = require('../db/models')
const Sequelize = require('sequelize')

module.exports = router

router.get('/', async (req, res, next) => {
  const cartSessionId = req.session.cartId
  try {
    if (!cartSessionId) {
      let newCart
      if (req.user) {
        newCart = await Cart.create({
          userId: req.user.id
        })
      } else {
        newCart = await Cart.create({})
      }
      req.session.cartId = newCart.id
      const breakfasts = await newCart.getBreakfasts()
      console.log('BREAKFASTS:', breakfasts)
      res.json(breakfasts)
    } else {
      const currentCart = await Cart.findByPk(cartSessionId)
      const breakfasts = await currentCart.getBreakfasts()
      console.log('BREAKFASTS:', breakfasts)
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
    await currentCart.remove(currentBreakfast)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
