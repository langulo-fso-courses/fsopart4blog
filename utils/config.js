// app config module
require('dotenv').config()
const PORT = process.env.PORT || 3001  // Application port
let MONGODB_URI = process.env.MONGODB_URI  // The DB URI

module.exports = {
  MONGODB_URI,
  PORT
}
