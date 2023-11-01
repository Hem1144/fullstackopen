const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const api = supertest(app);

describe("User creation", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  }, 10000);

  test("a valid user can be created", async () => {
    const newUser = {
      username: "testuser",
      password: "password",
      name: "Test User",
    };

    await api
      .post("/api/users")

      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const users = await User.find({});
    expect(users).toHaveLength(2);
    expect(users[1].username).toBe(newUser.username);
  });

  test("username must be unique", async () => {
    const newUser = {
      username: "root",
      password: "password",
      name: "Test User",
    };

    const response = await api.post("/api/users").send(newUser);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Username must be unique");
  });

  test("username and password must be at least 3 characters long", async () => {
    const shortUser = {
      username: "a",
      password: "password",
      name: "Short User",
    };

    const shortPassword = {
      username: "shortpassword",
      password: "a",
      name: "Short Password",
    };

    await api.post("/api/users").send(shortUser).expect(400);
    await api.post("/api/users").send(shortPassword).expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
