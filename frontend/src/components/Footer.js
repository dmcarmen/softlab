import React from 'react'

/****
* COMPONENT: Footer
* ARGS_IN: -
* DESCRIPTION: Component that renders the footer of the web
* ARGS_OUT: The html code that displays the foot of the web
****/
const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Alejandro Rabo y Carmen Diez :)</em>
    </div>
  )
}

export default Footer