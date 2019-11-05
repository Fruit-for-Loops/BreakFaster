const Sequelize = require('sequelize')
const db = require('../db')

const Breakfast = db.define('breakfast', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.DECIMAL(2),
    allowNull: false
  },
  pictureUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Paper_Plate.jpg/220px-Paper_Plate.jpg'
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: 'A very yummy breakfast.'
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = Breakfast
