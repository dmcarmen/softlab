import React, { useState, useEffect, useRef } from 'react'
import Book from './components/Book'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BookForm from './components/BookForm'
import Togglable from './components/Togglable'
import Footer from './components/Footer'
import Logout from './components/Logout'
import bookService from './services/books'
import loginService from './services/login'
import ratingService from './services/ratings'

const App = () => {
  const [books, setBooks] = useState([])
  const [showAll, setShowAll] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const bookFormRef = useRef()

  useEffect(() => {
    bookService
      .getAll()
      .then(initialBooks => {
        setBooks(initialBooks)
      })
  }, [])

  useEffect(async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBookappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      if (await loginService.validToken(user.token)) {
        setUser(user)
        ratingService.setToken(user.token)
      } else {
        setUser(null)
        ratingService.setToken(null)
      }
    }
  }, [])

  const toggleImportanceOf = id => {
    const book = books.find(n => n.id === id)
    const changedBook = { ...book, important: !book.important }

    bookService
      .update(id, changedBook)
      .then(returnedBook => {
        setBooks(books.map(book => book.id !== id ? book : returnedBook))
      })
      .catch(() => {
        setErrorMessage(
          `Book '${book.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const addBook = (bookObject) => {
    bookFormRef.current.toggleVisibility()
    bookService
      .create(bookObject)
      .then(returnedBook => {
        setBooks(books.concat(returnedBook))
      })
  }

  /*const booksToShow = showAll
    ? books
    : books.filter(book => book.important)*/

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      ratingService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBookappUser', JSON.stringify(user)
      )

      setUser(user)
      console.log(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      console.log(user)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    ratingService.setToken(null)
    window.localStorage.removeItem('loggedBookappUser')
  }

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const bookForm = () => (
    <Togglable buttonLabel="new book" ref={bookFormRef}>
      <BookForm createBook={addBook} />
    </Togglable>
  )

  return (
    <div>
      <h1>Bookers</h1>
      <Notification message={errorMessage} />

      {user === null ?
        loginForm() :
        <div>
          <p>Username : {user.name} </p>
          <Logout handleLogout={handleLogout} />
          {bookForm()}
        </div>
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>

      <ul>
        {books.map(book =>
          <Book
            key={book.id}
            book={book}
            toggleImportance={() => toggleImportanceOf(book.id)}
            logout={handleLogout}
            setErrorMessage={setErrorMessage}
            setBooks={setBooks}
            books={books}
          />
        )}
      </ul>
      <Footer />
    </div>
  )
}

export default App