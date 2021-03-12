import React, { useState } from 'react'
import ratingService from '../services/ratings'
import bookService from '../services/books'

/****
* COMPONENT: Book
* ARGS_IN: book: book that renders the component
*          logout: logout function in case tokens expire
*          setErrorMessage: function to display messeges in the top of the screen
*          setBooks: function to update the state of the books
*          books: array with all the books
* DESCRIPTION: Component that renders a book and let you submit ratings.
* ARGS_OUT: The html code that displays the book and the rating system
****/
const Book = ({ book , logout, setErrorMessage, setBooks, books }) => {

  const [rate, setRate] = useState(1)

  /****
  * FUNCTION: const handleRateChange = (event)
  * ARGS_IN: event: event that triggered it
  * DESCRIPTION: Changes the value of the rate to the value of the event target
  * ARGS_OUT: -
  ****/
  const handleRateChange = (event) => {
    setRate(event.target.value)
  }

  /****
  * FUNCTION: const onSubmitRate = async (event)
  * ARGS_IN: event: event that triggered it
  * DESCRIPTION: It adds a new rating to the book. If it is added successfully it
  *              reloads the book ratings.
  * ARGS_OUT: -
  ****/
  const onSubmitRate = async (event) => {
    event.preventDefault()
    setRate(1)
    const response = await ratingService.create({ BookId: book.id, rating: rate })
    if(response === 'token expired'){
      setErrorMessage('Session expired')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      logout()
    } else if(response === 'You can\'t rate from a mobile'){
      setErrorMessage(response)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } else {
      const newBook = await bookService.getBook(book.id)
      console.log('Libro nuevo: ' , newBook, 'Libros: ',books)
      const newBooks = books.map(book => {
        if(book.id === newBook.id){
          return newBook
        }else{
          return book
        }
      })
      setBooks(newBooks)
    }
  }

  return (
    <li className='book'>
      <p> Title: {book.name} </p>
      <p> Author: {book.author} </p>
      <p> Year of publishing: {book.year} </p>
      <p> Rating: {book.rating.toFixed(1)} </p>
      <p> Number ratings: {book.numRatings}  </p>

      <p>
        <form onSubmit={ onSubmitRate }>
          <label>
            Rate the book:
            <select value={rate} onChange={handleRateChange}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </p>

    </li>
  )
}

export default Book