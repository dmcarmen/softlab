const apiRouter = require('express').Router()
const axios = require('axios')

const baseLogin = 'http://localhost:3001/api/login'
const baseBooks = 'http://localhost:3001/api/books'
const baseUsers = 'http://localhost:3001/api/users'
const baseRatings = 'http://localhost:3001/api/ratings'

/* POST route that handles the client request.
 * The body must include the type of request they want
 * to do with the needed parameters to do it.
 */
apiRouter.post('/', async (request, response) => {
  const body = request.body
  const type = body.type
  let res = null
  if (type === 'login') {
    const credentials = {
      'username': body.username,
      'password': body.password,
    }
    res = await postReq(baseLogin, credentials)
  } else if (type === 'validToken') { //TODO ver bien si respuestas
    res = await postReq(`${baseLogin}/validToken`, { 'token': body.token })
  } else if (type === 'books') {
    res = await getReq(baseBooks)
  } else if (type === 'bookByID') {
    const id = body.id
    res = await getReq(`${baseBooks}/${id}`)
  } else if (type === 'users') {
    const data = {
      'username': body.username,
      'name': body.name,
      'password': body.password,
    }
    res = await postReq(baseUsers, data)
  } else if (type === 'ratings') {
    //TODO coger bien el token
    const config = {
      headers: { Authorization: body.token },
    }
    res = await postReq(baseRatings, body.rating, config)
  }

  //TODO errores
  if (res) {
    response.json(res)
  } else {
    response.status(404).end()
  }
})

/****
* FUNCTION: const getAll = async (url)
* ARGS_IN:  url: url to connect to
* DESCRIPTION: HTTP GET that retrieves all the information from a url
* ARGS_OUT: response.data: The json retrieved from the response
****/
const getReq = async (url) => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch(error) {
    return(error.response.data.error)
  }
}

/****
* FUNCTION: const postReq = async (url, data)
* ARGS_IN: url: url to connect to
*          data: data to send as body of the petition
* DESCRIPTION: HTTP POST to the url with the given data
* ARGS_OUT: response.data: data retrieved from the POST petition
****/
const postReq = async (url, data, config = null) => {
  try {
    const response = await axios.post(url, data, config)
    return response.data
  } catch(error) {
    return(error.response.data.error)
  }
}

module.exports = apiRouter