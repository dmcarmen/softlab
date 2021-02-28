require('dotenv').config()

//Fetching secret variables from .env file
const PORT = process.env.PORT

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI


const SECRET = process.env.SECRET

const EXPIRINGTIME = 60

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET,
  EXPIRINGTIME
}