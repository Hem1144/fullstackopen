const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");

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

describe("Testing of Blogs", () => {
  let token;
  beforeEach(async () => {
    await User.deleteMany({});
    const newUser = {
      username: "akash",
      name: "name",
      password: "password",
    };
    const newLogin = {
      username: "akash",
      password: "password",
    };

    const response = await api.post("/api/users").send(newUser);
    const response1 = await api.post("/api/login").send(newLogin);

    // console.log("response", response1.body.token);
    token = { authorization: `Bearer ${response1.body.token}` };

    // console.log(response.body, "New user info");
  }, 10000);

  test("a new blog can be added", async () => {
    // const response1 = await api.post("/api/users").send(newUser);

    const newBlog = {
      title: "My Title",
      author: "My Author",
      url: "myUrl",
      likes: 8,
    };

    const blogs = await api.post("/api/blogs").send(newBlog).set(token);

    // .expect(201)
    // .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    // console.log(response, "Response");
    expect(response.body).toHaveLength(initialBlogs.length + 1);

    const titles = response.body.map((blog) => blog.title);
    expect(titles).toContain(newBlog.title);
  });

  test("a blog can be deleted", async () => {
    const newBlog = {
      title: "My Title",
      author: "My Author",
      url: "myUrl",
      likes: 8,
    };

    const blogs = await api.post("/api/blogs").send(newBlog).set(token);

    const blogsAtStart = await api.get("/api/blogs");

    const blogToDelete = blogsAtStart.body[2];

    const del = await api.delete(`/api/blogs/${blogToDelete.id}`).set(token);

    const blogsAtEnd = await api.get("/api/blogs");
    expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length - 1);

    const titles = blogsAtEnd.body.map((blog) => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
  });

  test('missing "likes" property defaults to 0', async () => {
    const newBlog = {
      title: "No Likes Blog",
      author: "No Likes Author",
      url: "noLikesLink",
    };

    const response = await api.post("/api/blogs").send(newBlog).set(token);

    expect(response.body.likes).toBe(0);
  });
});

describe("Creating new blogs", () => {
  let token;
  beforeEach(async () => {
    await User.deleteMany({});
    const newUser = {
      username: "akash",
      name: "name",
      password: "password",
    };
    const newLogin = {
      username: "akash",
      password: "password",
    };

    const response = await api.post("/api/users").send(newUser);
    const response1 = await api.post("/api/login").send(newLogin);

    token = { authorization: `Bearer ${response1.body.token}` };
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

    await api.post("/api/blogs").send(blogWithoutTitle).set(token).expect(400);
    await api.post("/api/blogs").send(blogWithoutUrl).set(token).expect(400);
  });
});

test("updating a blog post changes the number of likes", async () => {
  const response = await api.get("/api/blogs");
  const blogToUpdate = response.body[0];

  const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(200);

  const updatedResponse = await api.get("/api/blogs");
  const updatedBlogFromResponse = updatedResponse.body.find(
    (blog) => blog.id === blogToUpdate.id
  );

  expect(updatedBlogFromResponse.likes).toBe(blogToUpdate.likes + 1);
});

describe("Blog creation with authentication", () => {
  let token = "";

  beforeEach(async () => {
    await Blog.deleteMany({});
    const newUser = {
      username: "akash",
      name: "name",
      password: "password",
    };
    const newLogin = {
      username: "akash",
      password: "password",
    };

    const response = await api.post("/api/users").send(newUser);
    const response1 = await api.post("/api/login").send(newLogin);

    //! Log in as the existing user and get the token

    token = response1.body.token;
  });

  test("a valid blog can be created with authentication", async () => {
    const newBlog = {
      title: "Test Blog",
      author: "Test Author",
      url: "http://testurl.com",
      likes: 5,
    };

    await api
      .post("/api/blogs")
      .set({ authorization: `Bearer ${token}` })
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogs = await api.get("/api/blogs");
    console.log(blogs, "blogs");

    expect(blogs.body).toHaveLength(1);
    expect(blogs.body[0].title).toBe(newBlog.title);
  });

  test("adding a blog without authentication fails with 401 Unauthorized", async () => {
    const newBlog = {
      title: "Test Blog",
      author: "Test Author",
      url: "http://testurl.com",
      likes: 5,
    };

    await api.post("/api/blogs").send(newBlog).expect(401);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
