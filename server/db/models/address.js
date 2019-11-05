const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define('address', {
  line1: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  line2: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  state: {
    type: Sequelize.STRING,
    validate: {
      isIn: [
        [
          'AL',
          'AK',
          'AS',
          'AZ',
          'AR',
          'CA',
          'CO',
          'CT',
          'DE',
          'DC',
          'FM',
          'FL',
          'GA',
          'GU',
          'HI',
          'ID',
          'IL',
          'IN',
          'IA',
          'KS',
          'KY',
          'LA',
          'ME',
          'MH',
          'MD',
          'MA',
          'MI',
          'MN',
          'MS',
          'MO',
          'MT',
          'NE',
          'NV',
          'NH',
          'NJ',
          'NM',
          'NY',
          'NC',
          'ND',
          'MP',
          'OH',
          'OK',
          'OR',
          'PW',
          'PA',
          'PR',
          'RI',
          'SC',
          'SD',
          'TN',
          'TX',
          'UT',
          'VT',
          'VI',
          'VA',
          'WA',
          'WV',
          'WI',
          'WY'
        ]
      ]
    }
  },
  zip: {
    type: Sequelize.INTEGER
  }
})

module.exports = Address
