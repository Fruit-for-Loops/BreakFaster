const router = require('express').Router()
const {Breakfast} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const breakfasts = await Breakfast.findAll()
    res.json(breakfasts)
  } catch (err) {
    next(err)
  }
})

router.put('/:breakfastId', async (req, res, next) => {
  try {
    const breakfastId = req.params.breakfastId
    const updatedStock = req.body.newSock
    console.log(updatedStock)
    await Breakfast.update(
      {
        stock: updatedStock
      },
      {
        where: {id: breakfastId}
      }
    )
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})
