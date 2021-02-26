import React, { useState } from 'react'

const BookForm = ({ createBook }) => {
  const [newBook, setNewBook] = useState('')

  const handleChange = (event) => {
    setNewBook(event.target.value)
  }

  const addBook = (event) => {
    event.preventDefault()
    createBook({
      content: newBook,
      important: Math.random() > 0.5,
    })

    setNewBook('')
  }

  return (
    <div>
      <h2>Add a book</h2>

      <form onSubmit={addBook}>
        <input
          value={newBook}
          onChange={handleChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BookForm
