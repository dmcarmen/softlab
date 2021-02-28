const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const ratingsRouter = require('express').Router()
const Rating = require('../models/rating')
const User = require('../models/user')
const Book = require('../models/book')

/* POST route to create a rating.
 * The body must include BookID and rating.
 * It should include an Authentication header with a valid token.
 */
ratingsRouter.post('/', async (request, response) => {
  const body = request.body

  //Checks if the token from the authentication header is valid
  const decodedToken = jwt.verify(request.token, config.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  if (user === null) {
    return response.status(401).json({ error: 'no user for this token' })
  }

  //Creates the new rating with the user and book id and saves it
  const book = await Book.findById(body.BookId)

  const rating = new Rating({
    rating: body.rating,
    book: book._id,
    user: user._id
  })
  const savedRating = await rating.save()

  //Updates user and book information
  user.ratings = user.ratings.concat(savedRating._id)
  await user.save()

  book.ratings = book.ratings.concat(savedRating._id)
  await book.save()

  response.json(savedRating.toJSON())
})

/* GET route to get all ratings */
ratingsRouter.get('/', async (request, response) => {
  const ratings = await Rating
    .find({}).populate('user', { username: 1, name: 1 })
    .populate('book', { name: 1, author: 1 })

  response.json(ratings.map(rating => rating.toJSON()))
})

module.exports = ratingsRouter