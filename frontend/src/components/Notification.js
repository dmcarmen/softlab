import React from 'react'

/****
* COMPONENT: Notification
* ARGS_IN: message: message to be displayed
* DESCRIPTION: Component that displays a message
* ARGS_OUT: The html code that displays a message
****/
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

export default Notification