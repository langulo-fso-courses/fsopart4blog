const config = require("./utils/config");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");
const app = express();  // express instance

console.log("connecting to db URI: ", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("error connection to MongoDB:", error.message);
  });

app.use(cors());  // enable cross origin reqs
app.use(express.static("build"));  // enable static delivery of the build vers. in the build folder
app.use(bodyParser.json());  // use the JSON body parser
app.use(middleware.requestLogger);  // use the custom defined logger middleware

// bind the controllers to the express app
app.use("/api/blogs", blogsRouter);

// KEEP THESE WHERE THEY ARE
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
