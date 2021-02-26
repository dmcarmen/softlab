import React from 'react'

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