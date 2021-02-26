const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5 },
  author: { type: String, required: true },
  year: Date,
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rating'
    }
  ]
})

bookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Book', bookSchema)