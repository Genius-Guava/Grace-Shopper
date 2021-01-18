const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    let email = req.body.email
    let password = req.body.password

    let errors = {}
    if (email == '') {
      errors.email = 'Email cannot be empty'
    } else if (!email.includes('@')) {
      errors.email = 'Invalid email format'
    }

    if (password == '') {
      errors.password = 'Password cannot be empty'
    }

    if (Object.keys(errors).length !== 0) {
      res.status(401).send(errors)
      return
    }

    const user = await User.findOne({where: {email: email}})
    if (!user) {
      console.log('No such user found:', email)
      res.status(401).send('Wrong username or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
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
router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else if (err.name === 'SequelizeValidationError') {
      let message = formatErrors(err)
      res.status(401).send(message)
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
