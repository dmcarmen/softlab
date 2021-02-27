const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../utils/config')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, config.SECRET, { expiresIn: config.EXPIRINGTIME })

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

loginRouter.post('/validToken', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(body.token, config.SECRET)
  if (!body.token || !decodedToken.id) {
    response.status(200).send({ validToken: false })
  } else {
    response.status(200).send({ validToken: true })
  }
})

module.exports = loginRouter