const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const ratingsRouter = require('express').Router()
const Rating = require('../models/rating')
const User = require('../models/user')
//const Book = require('../models/book')

ratingsRouter.get('/', async (request, response) => {
  const ratings = await Rating
    .find({}).populate('user', { username: 1, name: 1 })
    .populate('book', { name: 1, author: 1 })

  response.json(ratings.map(rating => rating.toJSON()))
})


ratingsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, config.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  //TODO get book.id from body or somewhere

  const rating = new Rating({
    rating: body.rating,
    //TODO: book: body.book.id,
    user: user._id
  })

  const savedRating = await rating.save()
  user.ratings = user.ratings.concat(savedRating._id)
  await user.save()
  //TODO: book.ratings = book.ratings.concat(savedRating._id)
  //await book.save()

  response.json(savedRating.toJSON())
})

ratingsRouter.get('/:id', async (request, response) => {
  const rating = await Rating.findById(request.params.id)
  if (rating) {
    response.json(rating.toJSON())
  } else {
    response.status(404).end()
  }
})

ratingsRouter.delete('/:id', async (request, response) => {
  const rating = await Rating.findById(request.params.id)
  const decodedToken = jwt.verify(request.token, config.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  if (rating.user.id.toString() !== decodedToken.id.toString()) {
    await Rating.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'you dont have permission to delete this blog' })
  }
})

//TODO: add authentication
ratingsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const rating = {
    content: body.content,
    important: body.important,
  }

  Rating.findByIdAndUpdate(request.params.id, rating, { new: true })
    .then(updatedRating => {
      response.json(updatedRating.toJSON())
    })
    .catch(error => next(error))
})

module.exports = ratingsRouter