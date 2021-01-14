const Sequelize = require('sequelize')
const db = require('../db')

let LineItem = db.define('lineItem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = LineItem
