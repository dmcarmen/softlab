import axios from 'axios'
const baseUrl = '/api/ratings'
let token = null

/****
* FUNCTION: const setToken = newToken
* ARGS_IN: newToken: new token of the user
* DESCRIPTION: Set the new token of the session
* ARGS_OUT: -
****/
const setToken = newToken => {
  token = `bearer ${newToken}`
}

/****
* FUNCTION: const create = async newObject
* ARGS_IN: newObject: rating object
* DESCRIPTION: Create a new rating
* ARGS_OUT: Return the new rating created or the error
****/
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  try {
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  } catch(error) {
    return(error.response.data.error)
  }
}

export default { create, setToken }