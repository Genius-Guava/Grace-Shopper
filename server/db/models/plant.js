const Sequelize = require('sequelize')
const db = require('../db')

let Plant = db.define('plant', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.FLOAT
  },
  description: {
    type: Sequelize.TEXT
  },
  light: {
    type: Sequelize.ENUM('lowlight', 'brightlight')
  },
  petFriendly: {
    type: Sequelize.BOOLEAN
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = Plant
