// This module is the app entry point
const app = require('./app') // the actual Express app (rest webservice API)
const http = require('http')  // node's built in server API
const config = require('./utils/config')  // app config js module

const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
