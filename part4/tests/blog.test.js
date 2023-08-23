const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const initialNotes = [
  {
    content: "HTML is easy",
    important: false,
  },
  {
    content: "Browser can execute only JavaScript",
    important: true,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let noteObject = new Blog(initialNotes[0]);
  await noteObject.save();
  noteObject = new Blog(initialNotes[1]);
  await noteObject.save();
});

const api = supertest(app);

test("GET /api/blogs returns correct amount of blog posts in JSON format", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 10000);

test("there are two notes", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(2);
});

test("the first note is about HTTP methods", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].title).toBe("HTML is easy");
});

afterAll(async () => {
  await mongoose.connection.close();
}, 10000);
