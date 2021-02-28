const logger = require('./logger')

//middleware handmade functions

/****
* FUNCTION: requestLogger = (request, response, next)
* ARGS_IN:  request: request to be logged
            response: -
            next: next middleware
* DESCRIPTION: logs a request information
* ARGS_OUT: -
****/
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

/****
* FUNCTION: tokenExtractor = (request, response, next)
* ARGS_IN:  request: request to extract the authentication token from
            response: -
            next: next middleware
* DESCRIPTION:  if there is an Authetication header with a token,
                the function extracts it
* ARGS_OUT: -
****/
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

/****
* FUNCTION: errorHandler = (error, request, response, next)
* ARGS_IN:  error: error to send
            request: -
            response:  response to be sent
            next: next middleware
* DESCRIPTION:  if there is an error, this function handles the answer
* ARGS_OUT: -
****/
const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  next(error)
}

/****
* FUNCTION: unknownEndpoint = (request, response)
* ARGS_IN:  request: -
            response: response to be sent
* DESCRIPTION:  if the endpoint is unknown, 404 status code is sent
* ARGS_OUT: -
****/
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
  requestLogger,
  tokenExtractor,
  unknownEndpoint,
  errorHandler
}