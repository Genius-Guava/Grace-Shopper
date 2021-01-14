const router = require('express').Router()
const {Order, LineItem, Plant, User} = require('../db/models')
module.exports = router

const isLoggedIn = (req, res, next) =>
  req.user ? next() : res.send('Please log in')

router.get('/', isLoggedIn, async (req, res, next) => {
  // console.log(req.user)
  const cart = await Order.findOne({
    include: {
      model: Plant
    },
    where: {
      status: 'In Cart',
      userId: req.user.id
    }
  })
  // console.log('CART',cart)
  if (cart) {
    res.json(cart)
  } else {
    res.json('Cart is currently empty.')
  }
})

// router.post('/', async (req, res, next) => {

//   try {
//     // find a cart
//     // see if item is in cart
//     // if item in cart, increase quantity
//     // if item not in cart, add item to cart
//     const cart = await Order.findOne({
//       include: {
//         model: Plant
//       },
//       where: {
//         status: 'In Cart',
//         userId: req.user.id
//       }
//     })
//     const item = await LineItem.findOne({
//       where: {
//         plantId: req.body.plantId,
//         orderId: cart.id
//       }
//     })
//     if (item) {
//       item.quantity ++;
//     } else {
//       await LineItem.create({
//         plantId: req.body.plantId,
//         orderId: cart.id
//       })
//     }
//   } catch(err) {
//     next(err)
//   }
// })
