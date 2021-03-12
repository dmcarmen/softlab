import axios from 'axios'
const baseUrl = '/APIGateway'
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
  console.log('token: ', token)
  const config = {
    headers: { Authorization: token },
  }

  //We add the type
  newObject.type = 'ratings'
  try {
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  } catch(error) {
    if(error.response.data.error !== undefined){
      return(error.response.data.error)
    }else{
      return(error.message)
    }
  }
}

export default { create, setToken }