const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

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

ratingSchema.index({ user: 1, book: 1 }, { unique: true })

ratingSchema.plugin(uniqueValidator)

ratingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Rating', ratingSchema)