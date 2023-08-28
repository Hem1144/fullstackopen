const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const { url } = require("./utils/config");
const { errorHandler, noHandlers, reqLogger } = require("./utils/middleware");
const userRouter = require("./controllers/users");
const blogsRouter = require("./controllers/blogs");

mongoose.connect(url);

app.use(cors());
app.use(express.json());

app.use(reqLogger);

app.use("/api/users", userRouter);
app.use("/api/blogs", blogsRouter);

app.use(noHandlers);

app.use(errorHandler);

module.exports = app;
