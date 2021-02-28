import React from 'react'

/****
* COMPONENT: Logout
* ARGS_IN: handleLogout: function that handles the logout
* DESCRIPTION: Component that renders the logout button
* ARGS_OUT: The html code that displays the logout button
****/
const Logout = ({ handleLogout }) => {
  return(
    <div>
      <button onClick={() => handleLogout()}>
        logout
      </button>
    </div>
  )
}

export default Logout