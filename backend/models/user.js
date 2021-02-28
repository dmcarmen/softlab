const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

//User schema for MongoDB
const userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  name: String,
  passwordHash: String,
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rating'
    }
  ],
})

//Ensures that each username is different
userSchema.plugin(uniqueValidator)

//Setting toJSON to not show _id, __v values and passwordHash
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)