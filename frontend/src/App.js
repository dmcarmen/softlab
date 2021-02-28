import React, { useState, useEffect } from 'react'
import Book from './components/Book'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Togglable from './components/Togglable'
import Footer from './components/Footer'
import Filter from './components/Filter'
import Logout from './components/Logout'
import bookService from './services/books'
import loginService from './services/login'
import ratingService from './services/ratings'
import userService from './services/users'

const App = () => {
  const [books, setBooks] = useState([])
  const [filter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  //Fetch all the books from the book database after the first rendering
  useEffect(() => {
    bookService
      .getAll()
      .then(initialBooks => {
        setBooks(initialBooks)
      })
  }, [])

  //We check if there is a valid token session after the first rendering
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

  /****
  * FUNCTION: const handleLogin = async (event)
  * ARGS_IN: event: event that triggered it
  * DESCRIPTION: Tries to login with the username and password introduced.
  *              If it works it changes the token and sets the user
  *              Otherwise it informs that it hasn't work
  * ARGS_OUT: -
  ****/
  const handleLogin = async (event) => {
    event.preventDefault()
    try{
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
    }catch (exception) {
      setErrorMessage('Wrong credentials')
      console.log(user)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  /****
  * FUNCTION: const handleRegister = async (event)
  * ARGS_IN: event: event that triggered it
  * DESCRIPTION: Tries to register the username with the password introduced.
  *              If it works it changes the token and logs with the new user
  *              Otherwise it informs that it hasn't work
  * ARGS_OUT: -
  ****/

  const handleRegister = async (event) => {
    event.preventDefault()
    try {
      await userService.create({ name, username, password })
    } catch (exception) {
      setErrorMessage('Something went wrong creating the user')
      console.log(user)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    handleLogin(event)
  }

  /****
  * FUNCTION: const handleLogout = ()
  * ARGS_IN: -
  * DESCRIPTION: Logs out the user, quitting the token session.
  * ARGS_OUT: -
  ****/
  const handleLogout = () => {
    setUser(null)
    ratingService.setToken(null)
    window.localStorage.removeItem('loggedBookappUser')
  }

  /****
  * FUNCTION: const handleFilterChange = (event)
  * ARGS_IN: event: event that triggered it
  * DESCRIPTION: Changes the value of the filter to the value of the event target
  * ARGS_OUT: -
  ****/
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  /****
  * FUNCTION: const loginForm = ()
  * ARGS_IN: -
  * DESCRIPTION: Renders the login form and its handlers
  * ARGS_OUT: -
  ****/
  const loginForm = () => (
    <Togglable buttonLabel="Log In">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  /****
  * FUNCTION: const registerForm = ()
  * ARGS_IN: -
  * DESCRIPTION: Renders the register form and its handlers
  * ARGS_OUT: -
  ****/
  const registerForm = () => (
    <Togglable buttonLabel="Register">
      <RegisterForm
        username={username}
        password={password}
        name={name}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleNameChange={({ target }) => setName(target.value)}
        handleSubmit={handleRegister}
      />
    </Togglable>
  )

  return (
    <div>
      <h1>Bookers</h1>
      <Notification message={errorMessage} />

      {user === null ?
        <div>
          {loginForm()}{registerForm()}
        </div>
        :
        <div>
          <p>Welcome {user.name}! </p>
          <Logout handleLogout={handleLogout} />
        </div>
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'rated' : 'all' }
        </button>
      </div>

      <Filter filter={filter} handler={handleFilterChange}/>

      <ul>
        {books
          //We add the filter that selects depending on the value introduced in the form
          .filter(book => book.name.toLowerCase().includes(filter.toLowerCase()))
          //We add the filter that selects depending on if the user wants to see
          //all books or only the ones rated
          .filter(book => {
            if(showAll){
              return true
            } else {
              if(user !== null){
                return  (book.ratings.find(rating => rating.user === user.id)) !== undefined ? true : false
              }
              return false
            }
          })
          .map(book =>
            <Book
              key={book.id}
              book={book}
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