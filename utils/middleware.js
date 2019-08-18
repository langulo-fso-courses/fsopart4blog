// Various custom middlewares for the express app
const logger = require('./logger') // Logging

const requestLogger = (req, res, next) => {
  // logging delegated to logger module
  const now = new Date();
  logger.info(`--- REQUEST @ ${now} ---`);
  logger.info("Method:  ", req.method);
  logger.info("Path:  ", req.path);
  logger.info("Body:  ", req.body);
  logger.info("--- END ----");
  next();
};

// Unknown endpoints
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

// Error handling (bad requests)
const errorHandler = (error, req, res, next) => {
  logger.error(error.message);  // logging delegated to logger module

  if (error.name === "CastError" && error.kind === "ObjectId") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
};
