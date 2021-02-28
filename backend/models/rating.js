const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

//Rating schema for MongoDB
const ratingSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

//Ensures that a user can only rate a book once
ratingSchema.index({ user: 1, book: 1 }, { unique: true })
ratingSchema.plugin(uniqueValidator)

//Setting toJSON to not show _id and __v values
ratingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Rating', ratingSchema)