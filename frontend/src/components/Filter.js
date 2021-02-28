import React from 'react'

/****
* COMPONENT: Filter
* ARGS_IN: filter: state variable that saves the filter string to be applied
*          handler: event handler use to update the state of the filter variable
* DESCRIPTION: Component that renders the html of the title filter
* ARGS_OUT: The html code that displays the filter
****/
const Filter = ({ filter, handler }) => {
  return (
    <div>
        filter with book title: <input
        value={filter}
        onChange={handler}
      />
    </div>
  )
}

export default Filter