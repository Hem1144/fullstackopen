const info = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.log(...params);
  }
};

const error = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.log("in not test error");
    console.log(...params);
  }
};

module.exports = {
  info,
  error,
};
