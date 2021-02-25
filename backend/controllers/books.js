const jwt = require('jsonwebtoken')
const booksRouter = require('express').Router()
const Book = require('../models/book')
const User = require('../models/user')

booksRouter.get('/', async (request, response) => {
  const books = await Book
    .find({}).populate('users', { username: 1, name: 1 })

  response.json(books.map(book => book.toJSON()))
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

booksRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const book = new Book({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    date: new Date(),
    user: user._id
  })

  const savedBook = await book.save()
  user.books = user.books.concat(savedBook._id)
  await user.save()

  response.json(savedBook.toJSON())
})
booksRouter.get('/:id', async (request, response) => {
  const book = await Book.findById(request.params.id)
  if (book) {
    response.json(book.toJSON())
  } else {
    response.status(404).end()
  }
})

booksRouter.delete('/:id', async (request, response) => {
  await Book.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

booksRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const book = {
    content: body.content,
    important: body.important,
  }

  Book.findByIdAndUpdate(request.params.id, book, { new: true })
    .then(updatedBook => {
      response.json(updatedBook.toJSON())
    })
    .catch(error => next(error))
})

module.exports = booksRouter