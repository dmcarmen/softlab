import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const validToken = async (token) => {
  const response = await axios.post(`${baseUrl}/validToken`, { 'token': token })
  return response.data.validToken
}

export default { login, validToken }