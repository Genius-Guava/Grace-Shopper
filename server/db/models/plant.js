const Sequelize = require('sequelize')
const db = require('../db')

let Plant = db.define('plant', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://images-na.ssl-images-amazon.com/images/I/41kT5IhNiwL.jpg'
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 50.0
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
