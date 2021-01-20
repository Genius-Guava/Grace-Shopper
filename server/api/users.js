const router = require('express').Router()
const {User} = require('../db/models')
const {isAdmin} = require('./security')
module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'isAdmin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

const formatErrors = err => {
  let errors = err.errors
  out = {}
  for (let error of errors) {
    out[error.path] = error.message
  }

  return out
}

router.put('/me', async (req, res, next) => {
  try {
    const {firstName, lastName, address1, address2, city, zip, state} = req.body
    let updates = {
      firstName,
      lastName,
      address1,
      address2,
      city,
      zip,
      state
    }

    for (let key in updates) {
      if (updates[key] === '') {
        updates[key] = null
      }
    }
    const user = await req.user.update(updates)
    res.json(user)
  } catch (err) {
    console.log(err)
    if (err.name === 'SequelizeValidationError') {
      let message = formatErrors(err)
      res.status(401).send(message)
    } else {
      next(err)
    }
  }
})
