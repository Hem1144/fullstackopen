const app = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");

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

app.post("/", async (request, response, next) => {
  try {
    const blogData = request.body;

    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }
    // const user = await User.findById(decodedToken.id);
    const user = request.user;

    if (!blogData.title || !blogData.url) {
      return response.status(400).json({ error: "Title and URL are required" });
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
app.put("/:id", async (req, response, next) => {
  const blog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true,
    });
    response.json(updatedBlog);
  } catch (error) {
    response.status(400).send({ error: "Invalid blog id" });
  }
});

app.delete("/:id", async (request, response) => {
  const id = request.params.id;

  //! Check if the request includes a valid token
  const token = request.token;
  if (!token) {
    return response.status(401).json({ error: "Token missing or invalid" });
  }

  //! Verify the token and extract the user's id from it
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "Token missing or invalid" });
  }

  //! Find the blog to be deleted
  const blog = await Blog.findById(id);

  //! Check if the blog exists
  if (!blog) {
    return response.status(404).json({ error: "Blog not found" });
  }

  //! Check if the user trying to delete the blog is the creator of the blog
  if (blog.users.toString() !== decodedToken.id) {
    return response.status(403).json({ error: "Permission denied" });
  }

  try {
    await Blog.findByIdAndRemove(id);
    response.status(204).end();
  } catch (error) {
    response.status(400).json({ error: "Invalid blog id" });
  }
});

module.exports = app;
