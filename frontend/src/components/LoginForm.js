import React from 'react'
import PropTypes from 'prop-types'

/****
* COMPONENT: LoginForm
* ARGS_IN: handleSubmit: function that handles the login
           handleUsernameChange: event handler use to update the state of the username variable
           handlePasswordChange: event handler use to update the state of the password variable
           username: state variable that saves the username
           password: state variable that saves the password
* DESCRIPTION: Component that renders login form and its handlers
* ARGS_OUT: The html code that displays the login form
****/
const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm