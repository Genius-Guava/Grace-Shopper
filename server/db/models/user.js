const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'First name cannot be empty'
      }
    }
  },

  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Last name cannot be empty'
      }
    }
  },

  address1: {
    type: Sequelize.STRING,
    allowNull: true
  },

  address2: {
    type: Sequelize.STRING,
    allowNull: true
  },

  city: {
    type: Sequelize.STRING,
    allowNull: true
  },

  zip: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isNumeric: {
        msg: 'Zip code must be a number'
      } // don't allow empty strings
    }
  },

  state: {
    type: Sequelize.STRING,
    allowNull: true
  },

  phone: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isNumeric: {
        msg: 'Zip code must be a number'
      }
    }
  },

  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'Email is not valid'
      },
      notEmpty: {
        msg: 'Email cannot be empty'
      }
    }
  },
  // username: {
  //   type: Sequelize.STRING,
  //   unique: true,
  //   allowNull: false
  // },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      notEmpty: {
        msg: 'Password cannot be empty'
      }
    },
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})
