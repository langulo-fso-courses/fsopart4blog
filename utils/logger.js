// logging middleware
const info = (...params) => {
  // Only logs request info in production
  if (process.env.NODE_ENV !== "test") {
    console.log(...params);
  }
};

const error = (...params) => {
  // always logs errors
  console.error(...params);
};

module.exports = {
  info,
  error
};
