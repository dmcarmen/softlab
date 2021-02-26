import React, { useState } from 'react'
import ratingsService from '../services/ratings'

const Book = ({ book, toggleImportance , logout, setErrorMessage }) => {

  const [rate, setRate] = useState(1)

  const label = book.important
    ? 'make not important' : 'make important'

  const handleRateChange = (event) => {
    setRate(event.target.value)
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
        <form onSubmit={ async (event) => {
          event.preventDefault()
          setRate(1)
          const response = await ratingsService.create({ BookId: book.id, rating: rate })
          console.log(response)
          if(response === 'token expired'){
            setErrorMessage('Session expired')
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            logout()
          }

        }}>
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