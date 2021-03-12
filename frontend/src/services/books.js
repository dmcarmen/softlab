import axios from 'axios'
const baseUrl = '/APIGateway'

/****
* FUNCTION: const getAll = async ()
* ARGS_IN: -
* DESCRIPTION: HTTP POST that retrieves all the books
* ARGS_OUT: response.data: The books retrieved from the response
****/
const getAll = async () => {
  const response = await axios.post(baseUrl,  { 'type': 'books' })
  return response.data
}

/****
* FUNCTION: const getBook = async (id)
* ARGS_IN: id: id of a book
* DESCRIPTION: HTTP POST that retrieves a book from the database with the id
*              passed as an argument
* ARGS_OUT: response.data: The book retrieved from the response
****/
const getBook = async (id) => {
  const reqString = `${baseUrl}`
  const response = await axios.post(reqString, { 'type': 'bookByID', 'id': id })
  console.log(response.data)
  return response.data
}

export default { getAll, getBook }
