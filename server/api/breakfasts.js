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
