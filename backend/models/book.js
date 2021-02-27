const mongoose = require('mongoose')

const avg = (ratings) => {
  const rats = ratings.map(r => r.rating)
  const sum = rats.reduce((ini, curr) => ini + curr, 0)
  return((sum / rats.length) || 0)
}

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
    if(returnedObject.ratings !== undefined){
      returnedObject.numRatings = returnedObject.ratings.length
      returnedObject.rating = avg(returnedObject.ratings)
    }
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Book', bookSchema)