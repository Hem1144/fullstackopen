const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;

    if (!body.password || body.password.length < 3) {
      return response
        .status(400)
        .json({ error: "Password must be at least 3 characters long" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });

    const savedUser = await user.save();
    response.json(savedUser);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", { title: 1, url: 1 });
  response.json(users);
});

userRouter.get("/:id", async (request, response) => {
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

module.exports = userRouter;
