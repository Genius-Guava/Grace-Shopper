const User = require('./user')
const Plant = require('./plant')
const Order = require('./order')
const LineItem = require('./lineItem')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

//OrderItem.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)
Plant.belongsToMany(Order, {through: 'lineItem'})
Order.belongsToMany(Plant, {through: 'lineItem'})

// User.hasMany(Order)
// Order.belongsTo(User)
// OrderItem.belongsTo(Order)
// Order.belongsToMany(OrderItem, {through: 'order-items'})
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Plant,
  Order,
  LineItem
}
