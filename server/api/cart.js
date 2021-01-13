const router = require('express').Router()
const {Order, OrderItem, Plant, User} = require('../db/models')
module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findAll({
      where: {
        id: req.params.userId
      },
      include: [
        {
          model: Order
          // where: {status: 'In Cart'},
        }
      ]
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId', async (req, res, next) => {
  try {
    const {
      name,
      imageUrl,
      price,
      description,
      light,
      petFriendly,
      quantity
    } = req.body
    // find user

    const user = await User.findAll({
      where: {
        id: req.params.userId
      },
      include: [
        {
          model: Order
          // where: {status: 'In Cart'},
        }
      ]
    })
    // {user, [order]}
    const existingOrder = user[0].orders[0]
    // create new item
    const newItem = await OrderItem.create({
      name,
      imageUrl,
      price,
      description,
      light,
      petFriendly,
      quantity
    })
    // find if user has order in cart
    if (existingOrder.id !== undefined) {
      await newItem.addOrders(existingOrder)
    } else {
      const newOrder = await Order.create({userId: req.params.userId})
      await newItem.addOrders(newOrder)
    }
    res.json(newItem)
  } catch (err) {
    next(err)
  }
})

// router.get('/:userId', async (req, res, next) => {
//   try {
//     const cart = Order.findAll({
//       where: {
//         status: 'In Cart',
//         userId: req.params.userId,
//       },
//     })
//     res.json(cart)
//   } catch (err) {
//     console.error(err)
//   }
// })
