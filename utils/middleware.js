// Various custom middlewares for the express app
// Logging
const requestLogger = (req, res, next) => {
  const now = new Date();
  console.log(`--- REQUEST @ ${now} ---`);
  console.log("Method:  ", req.method);
  console.log("Path:  ", req.path);
  console.log("Body:  ", req.body);
  console.log("--- END ----");
  next();
};

// Unknown endpoints
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

// Error handling (bad requests)
const errorHandler = (error, req, res, next) => {
  // TODO: Adjust for blog mongoose validations
  console.error(error.message);

  if (error.name === "CastError" && error.kind === "ObjectId") {
    return req.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return req.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
};
