const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const { url } = require("./utils/config");
const Blog = require("./models/blog");

mongoose.connect(url);

app.use(cors());
app.use(express.json());

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.get("/api/blogs/:id", async (request, response) => {
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

app.post("/api/blogs", (request, response) => {
  const blogData = request.body;

  if (!blogData.title || !blogData.url) {
    return response.status(400).json({ error: "Title and URL are required" });
  }

  const blog = new Blog(request.body);

  if (!blog.likes) {
    blog.likes = 0;
  }

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

app.put("/api/blogs/:id", async (request, response) => {
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

app.delete("/api/blogs/:id", async (request, response) => {
  const id = req;
  uest.params.id;

  try {
    await Blog.findByIdAndRemove(id);
    response.status(204).end();
  } catch (error) {
    response.status(400).json({ error: "Invalid blog id" });
  }
});

module.exports = app;
