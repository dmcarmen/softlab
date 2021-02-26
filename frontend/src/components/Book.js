import React from 'react'
import ratingsService from '../services/ratings'

const Book = ({ book, toggleImportance, handle, rate }) => {
  const label = book.important
    ? 'make not important' : 'make important'

  return (
    <li className='book'>
      <p> Title: {book.name} </p>
      <p> Author: {book.author} </p>
      <p> Year of publishing: {book.year} </p>
      <p> Rating: {book.rating} </p>
      <p> Number ratings: {book.numRatings}  </p>
      <p>
        <button onClick={toggleImportance}>{label}</button>
      </p>

      <p>
        <form onSubmit={() => {
          ratingsService.create({ BookId: book.id, rating: rate })
        }}>
          <label>
            Rate the book:
            <select value={book.rating} onChange={handle}>
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