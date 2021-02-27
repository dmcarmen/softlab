import axios from 'axios'
const baseUrl = '/api/books'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getBook = async (id) => {
  const reqString = `${baseUrl}/${id}`
  const response = await axios.get(reqString)
  console.log(response.data)
  return response.data
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, getBook, create, update }
