import React from 'react'

const Book = ({ book, toggleImportance }) => {
  const label = book.important
    ? 'make not important' : 'make important'

  return (
    <li className='book'>
      Titule: {book.name}
      Author: {book.author}
      Year of publishing: {book.year}
      Rating: {book.rating} Number ratings: {book.numRatings}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Book