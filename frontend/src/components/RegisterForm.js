import React from 'react'
import PropTypes from 'prop-types'


/****
* COMPONENT: RegisterForm
* ARGS_IN: handleSubmit: function that handles the login
           handleUsernameChange: event handler use to update the state of the username variable
           handlePasswordChange: event handler use to update the state of the password variable
           handleNameChange: event handler use to update the state of the password variable
           name: state variable that saves the name
           username: state variable that saves the username
           password: state variable that saves the password
* DESCRIPTION: Component that renders the register form and its handlers
* ARGS_OUT: The html code that displays the register form
****/
const RegisterForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  handleNameChange,
  name,
  username,
  password
}) => {
  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <div>
          name
          <input
            value={name}
            onChange={handleNameChange}
          />
        </div>
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
        <button type="submit">register</button>
      </form>
    </div>
  )
}

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default RegisterForm