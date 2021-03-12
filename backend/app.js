const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
require('express-async-errors')

//Initialize express Routers
const booksRouter = require('./controllers/books')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const ratingsRouter = require('./controllers/ratings')
const apiRouter = require('./controllers/apiGateway')

//Connection to the database
logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

//Prepare middlewares
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/APIGateway', apiRouter)
app.use(config.URLBOOKS, booksRouter)
app.use(config.URLUSERS, usersRouter)
app.use(config.URLLOGIN, loginRouter)
app.use(config.URLRATINGS, ratingsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app