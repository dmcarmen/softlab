import axios from 'axios'
const baseUrl = '/APIGateway'

/****
* FUNCTION: const login = async credentials
* ARGS_IN: credentials: Object with the username and password
* DESCRIPTION: HTTP POST that tries to login
* ARGS_OUT: response.data: The user retrieved from the response or an
            error if the login fails
****/
const login = async credentials => {
  credentials.type = 'login'
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

/****
* FUNCTION: const validToken = async (token)
* ARGS_IN: token: token of a user
* DESCRIPTION: Checks if the token of the user hasn't expired
* ARGS_OUT: boolean that express the validity of the token
****/
const validToken = async (token) => {
  try {
    const response = await axios.post(`${baseUrl}`, { 'token': token , 'type': 'validToken' })
    return response.data.validToken
  } catch(error) {
    return(false)
  }
}

export default { login, validToken }