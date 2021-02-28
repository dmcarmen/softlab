const mongoose = require('mongoose')

/****
* FUNCTION:     avg = (ratings)
* ARGS_IN:      ratings: list of ratings with all its info
* DESCRIPTION:  calculates the average of the ratings received
* ARGS_OUT:     average
****/
const avg = (ratings) => {
  const rats = ratings.map(r => r.rating)
  const sum = rats.reduce((ini, curr) => ini + curr, 0)
  return((sum / rats.length) || 0)
}

//Book schema for MongoDB
const bookSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5 },
  author: { type: String, required: true },
  year: Number,
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rating'
    }
  ]
})

//Setting toJSON so that it returns the number of ratings and their average
// and to not show _id and __v values
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