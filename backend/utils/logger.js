//Logging functions for errors and information

/****
* FUNCTION: info = (...params)
* ARGS_IN: ...params: params to print
* DESCRIPTION: prints in the console as information
* ARGS_OUT: -
****/
const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

/****
* FUNCTION: error = (...params)
* ARGS_IN: ...params: params to print
* DESCRIPTION: prints in the console as error
* ARGS_OUT: -
****/
const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(...params)
  }
}

module.exports = {
  info, error
}