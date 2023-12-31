const bcrypt = require("bcrypt");
const app = require("express").Router();
const User = require("../models/user");

app.post("/", async (request, response, next) => {
  const body = request.body;
  try {
    if (!body.username || !body.password) {
      return response
        .status(400)
        .json({ error: "Username and password are required" });
    }

    if (body.username.length < 3 || body.password.length < 3) {
      return response.status(400).json({
        error: "Username and password must be at least 3 characters long",
      });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const existingUser = await User.findOne({ username: body.username });

    if (existingUser) {
      return response.status(400).json({ error: "Username must be unique" });
    }

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });

    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

app.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    url: 1,
    author: 1,
  });
  response.json(users);
});

app.get("/:id", async (request, response) => {
  try {
    const user = await User.findById(request.params.id);
    if (user) {
      response.json(user);
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    response.status(400).json({ error: "Malformed user ID" });
  }
});

module.exports = app;
