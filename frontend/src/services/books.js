import axios from 'axios'
const baseUrl = '/api/books'

/****
* FUNCTION: const getAll = async ()
* ARGS_IN: -
* DESCRIPTION: HTTP GET that retrieves all the books
* ARGS_OUT: response.data: The books retrieved from the response
****/
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

/****
* FUNCTION: const getBook = async (id)
* ARGS_IN: id: id of a book
* DESCRIPTION: HTTP GET that retrieves a book from the database with the id
*              passed as an argument
* ARGS_OUT: response.data: The book retrieved from the response
****/
const getBook = async (id) => {
  const reqString = `${baseUrl}/${id}`
  const response = await axios.get(reqString)
  console.log(response.data)
  return response.data
}

export default { getAll, getBook }
