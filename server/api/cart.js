const router = require('express').Router()
const {Order, OrderItem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const cart = Order.findAll({
      where: {
        status: 'In Cart'
      }
    })
    res.json(cart)
  } catch (err) {
    console.error(err)
  }
})
