const router = require('express').Router()
const {Cart, Breakfast, CartItem} = require('../db/models')
const Sequelize = require('sequelize')

module.exports = router

router.get('/', async (req, res, next) => {
  const cartSessionId = req.session.cartId
  try {
    let currentCart
    //check if there is a cart in this session
    if (!cartSessionId) {
      //if not, get or make a cart for the session
      //and assign it to the session
      currentCart = await Cart.getOrMakeCart(req.user)
      req.session.cartId = currentCart.id
    } else {
      //if so, find the cart associated with this session
      currentCart = await Cart.findByPk(cartSessionId)
    }
    //get the breakfasts in the current cart and send to client
    const breakfasts = await currentCart.getBreakfasts({
      order: ['createdAt']
    })
    res.json(breakfasts)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const currentCart = await Cart.findByPk(req.session.cartId)
    const currentBreakfast = await Breakfast.findByPk(req.body.id)
    const newItem = await currentCart.addBreakfast(currentBreakfast)
    const newBreakfast = await currentCart.getBreakfasts({
      where: {
        id: currentBreakfast.id
      }
    })
    await CartItem.update(
      {
        currentPrice: currentBreakfast.price
      },
      {
        where: {
          breakfastId: req.body.id,
          cartId: req.session.cartId
        }
      }
    )
    const updatedBreakfast = await currentCart.getBreakfasts({
      where: {id: req.body.id}
    })
    res.status(201).send(updatedBreakfast[0])
  } catch (error) {
    next(error)
  }
})

// router.put('/increase', async (req, res, next) => {
//   try {
//     const [num, updatedItem] = await CartItem.update(
//       {
//         quantity: Sequelize.literal('quantity + 1')
//       },
//       {
//         where: {
//           breakfastId: req.body.id,
//           cartId: req.session.cartId
//         },
//         returning: true,
//         plain: true
//       }
//     )
//     console.log('router newItem:', updatedItem)
//     const currentCart = await Cart.findByPk(updatedItem.cartId)
//     const updatedBreakfast = await currentCart.getBreakfasts({
//       where: {
//         id: updatedItem.breakfastId
//       }
//     })
//     console.log('router updatedBreakfast:', updatedBreakfast[0])
//     res.status(204).json(updatedBreakfast[0])
//   } catch (error) {
//     next(error)
//   }
// })

router.put('/increase', async (req, res, next) => {
  try {
    await CartItem.update(
      {
        quantity: Sequelize.literal('quantity + 1')
      },
      {
        where: {
          breakfastId: req.body.id,
          cartId: req.session.cartId
        },
        returning: true,
        plain: true
      }
    )
    const currentCart = await Cart.findByPk(req.session.cartId)
    const updatedBreakfast = await currentCart.getBreakfasts({
      where: {id: req.body.id}
    })
    res.send(updatedBreakfast)
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
          breakfastId: req.body.id,
          cartId: req.session.cartId
        },
        returning: true,
        plain: true
      }
    )
    const currentCart = await Cart.findByPk(req.session.cartId)
    const updatedBreakfast = await currentCart.getBreakfasts({
      where: {id: req.body.id}
    })
    res.send(updatedBreakfast)
  } catch (error) {
    next(error)
  }
})

//what is this sending back?
router.put('/:cartId', async (req, res, next) => {
  try {
    const cartId = req.params.cartId
    await Cart.update(
      {
        purchased: new Date()
      },
      {
        where: {id: cartId}
      }
    )
    req.session.cartId = null
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const currentCart = await Cart.findByPk(req.session.cartId)
    const currentBreakfast = await Breakfast.findByPk(req.params.id)
    const deletedBreakfast = await currentCart.getBreakfasts({
      where: {id: req.body.id}
    })
    await currentCart.removeBreakfast(currentBreakfast)
    res.send(deletedBreakfast)
  } catch (error) {
    next(error)
  }
})
