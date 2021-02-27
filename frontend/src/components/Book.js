import React, { useState } from 'react'
import ratingService from '../services/ratings'
import bookService from '../services/books'


const Book = ({ book, toggleImportance , logout, setErrorMessage, setBooks, books }) => {

  const [rate, setRate] = useState(1)

  const label = book.important
    ? 'make not important' : 'make important'

  const handleRateChange = (event) => {
    setRate(event.target.value)
  }

  const onSubmitRate = async (event) => {
    event.preventDefault()
    setRate(1)
    const response = await ratingService.create({ BookId: book.id, rating: rate })
    //console.log(response)
    if(response === 'token expired'){
      setErrorMessage('Session expired')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      logout()
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
        <button onClick={toggleImportance}>{label}</button>
      </p>

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