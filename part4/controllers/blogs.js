const app = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

app.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("users", {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

app.get("/:id", async (request, response) => {
  const id = request.params.id;

  try {
    const blog = await Blog.findById(id);
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    response.status(400).json({ error: "Invalid blog ID" });
  }
});

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

app.post("/", async (request, response, next) => {
  try {
    const blogData = request.body;

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }
    const user = await User.findById(decodedToken.id);

    if (!blogData.title || !blogData.url) {
      return response.status(401).json({ error: "Title and URL are required" });
    }

    // const user = await User.findById(request.body.users);

    const blog = new Blog({
      ...request.body,
      users: user._id,
    });

    if (!blog.likes) {
      blog.likes = 0;
    }

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});
app.put("/:id", async (request, response) => {
  const id = request.params.id;
  const updatedBlogData = request.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedBlogData, {
      new: true,
    });
    response.json(updatedBlog);
  } catch (error) {
    response.status(400).send({ error: "Invalid blog id" });
  }
});

app.delete("/:id", async (request, response) => {
  const id = request.params.id;

  try {
    await Blog.findByIdAndRemove(id);
    response.status(204).end();
  } catch (error) {
    response.status(400).json({ error: "Invalid blog id" });
    return;
  }
});

module.exports = app;
