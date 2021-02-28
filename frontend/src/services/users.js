import axios from 'axios'
const baseUrl = '/api/users'

/****
* FUNCTION: const create = async newObject
* ARGS_IN: newObject: user to be created
* DESCRIPTION: Create a new user
* ARGS_OUT: Return the new user created retrieved from the backends
****/
const create = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

export default { create }
