const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

/* POST route to create a user.
 * The body must include name, unique username and password.
 */
usersRouter.post('/', async (request, response) => {
  const body = request.body

  //Calculates the hash for the password
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })
  const savedUser = await user.save()

  response.json(savedUser)
})

/* GET route to get all users */
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('books', { content: 1, date: 1 })

  response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter