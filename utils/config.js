// app config module
require('dotenv').config()
const PORT = process.env.PORT || 3001  // Application port
let MONGODB_URI = process.env.MONGODB_URI  // The DB URI

if (process.env.NODE_ENV === 'test'){
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  MONGODB_URI,
  PORT
}
