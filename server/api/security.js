const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next()
  } else {
    throw new Error('This page is for admins only.')
  }
}

module.exports = {
  isAdmin
}
