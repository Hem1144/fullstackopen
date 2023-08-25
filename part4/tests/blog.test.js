const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "HTML is easy",
    author: "John Doe",
    url: "myLink",
    likes: 5,
  },
  {
    title: "Browser can execute only JavaScript",
    author: "Jane Smith",
    url: "thisLink",
    likes: 10,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let noteObject = new Blog(initialBlogs[0]);
  await noteObject.save();
  noteObject = new Blog(initialBlogs[1]);
  await noteObject.save();
}, 10000);

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

test("the first note is about HTML", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].title).toBe("HTML is easy");
});

test("blogs have property 'id' instead of '_id'", async () => {
  const response = await api.get("/api/blogs");
  response.body.forEach((blog) => {
    expect(blog.id).toBeDefined();
    expect(blog._id).toBeUndefined();
  });
});

test("a new blog can be added", async () => {
  const newBlog = {
    title: "My Title",
    author: "My Author",
    url: "myUrl",
    likes: 8,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length + 1);

  const titles = response.body.map((blog) => blog.title);
  expect(titles).toContain(newBlog.title);
});

test('missing "likes" property defaults to 0', async () => {
  const newBlog = {
    title: "No Likes Blog",
    author: "No Likes Author",
    url: "noLikesLink",
  };

  const response = await api.post("/api/blogs").send(newBlog);

  expect(response.body.likes).toBe(0);
});

describe("Creating new blogs", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
  });

  test("missing 'title' or 'url' properties result in 400 Bad Request", async () => {
    const blogWithoutTitle = {
      author: "No author",
      url: "noTitleUrl",
      likes: 3,
    };

    const blogWithoutUrl = {
      title: "No url",
      author: "No author",
      likes: 2,
    };

    await api.post("/api/blogs").send(blogWithoutTitle).expect(400);
    await api.post("/api/blogs").send(blogWithoutUrl).expect(400);
  });
});

test("a blog can be deleted", async () => {
  const blogsAtStart = await api.get("/api/blogs");
  const blogToDelete = blogsAtStart.body[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await api.get("/api/blogs");
  expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length - 1);

  const titles = blogsAtEnd.body.map((blog) => blog.title);
  expect(titles).not.toContain(blogToDelete.title);
});

afterAll(async () => {
  await mongoose.connection.close();
});
