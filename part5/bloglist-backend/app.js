const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const { url } = require("./utils/config");
const userRouter = require("./controllers/users");
const blogsRouter = require("./controllers/blogs");
const loginRouter = require("./controllers/login");
const logger = require("./utils/logger");

const {
  errorHandler,
  unknownEndpoint,
  requestLogger,
  userExtractor,
} = require("./utils/middleware");
const middleware = require("./utils/middleware");
mongoose
  .connect(url)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Error occured while connecting to DB.", error);
  });

app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.use(middleware.tokenExtractor);

app.use("/api/blogs", userExtractor, blogsRouter);

app.use("/api/users", userRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
