const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const { url } = require("./utils/config");
const userRouter = require("./controllers/users");
const blogsRouter = require("./controllers/blogs");
const {
  errorHandler,
  unknownEndpoint,
  requestLogger,
} = require("./utils/middleware");

mongoose.connect(url);

app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.use("/api/users", userRouter);
app.use("/api/blogs", blogsRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
