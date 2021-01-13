const Sequelize = require('sequelize')
const db = require('../db')

let Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('In Cart', 'Past'),
    defaultValue: 'In Cart'
  }
})

module.exports = Order
