const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
}, 10000);

test("creating a new user works", async () => {
  const newUser = {
    username: "root",
    name: "Super User",
    password: "testpassword",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const users = await User.find({});
  expect(users).toHaveLength(1);
  expect(users[0].username).toBe(newUser.username);
});

test("creating a user with a short password fails", async () => {
  const newUser = {
    username: "shortpass",
    name: "Short Pass User",
    password: "12",
  };

  await api.post("/api/users").send(newUser).expect(400);

  const users = await User.find({});
  expect(users).toHaveLength(0);
});

afterAll(async () => {
  await mongoose.connection.close();
});
