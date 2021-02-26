const booksRouter = require('express').Router()
const Book = require('../models/book')

booksRouter.get('/', async (request, response) => {
  const books = await Book
    .find({}).populate('ratings', { rating: 1, user: 1 })

  response.json(books.map(book => book.toJSON()))
})

booksRouter.post('/', async (request, response) => {
  const body = request.body

  const book = new Book({
    name: body.name,
    author: body.author,
    year: new Date() //TODO
  })

  const savedBook = await book.save()
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
    name: body.name,
    author: body.author,
    year: new Date() //TODO
  }

  Book.findByIdAndUpdate(request.params.id, book, { new: true })
    .then(updatedBook => {
      response.json(updatedBook.toJSON())
    })
    .catch(error => next(error))
})

module.exports = booksRouter