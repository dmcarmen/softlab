const booksRouter = require('express').Router()
const Book = require('../models/book')

/* GET all books route */
booksRouter.get('/', async (request, response) => {
  const books = await Book
    .find({}).populate('ratings', { rating: 1, user: 1 })

  response.json(books.map(book => book.toJSON()))
})

/* GET route for a specific book */
booksRouter.get('/:id', async (request, response) => {
  const book = await Book.findById(request.params.id).populate('ratings', { rating: 1, user: 1 })
  if (book) {
    response.json(book.toJSON())
  } else {
    response.status(404).end()
  }
})

/* POST route to add a new book.
 * The body must include name, author and year.
 */
booksRouter.post('/', async (request, response) => {
  const body = request.body

  const book = new Book({
    name: body.name,
    author: body.author,
    year: body.year
  })

  const savedBook = await book.save()
  response.json(savedBook.toJSON())
})

module.exports = booksRouter