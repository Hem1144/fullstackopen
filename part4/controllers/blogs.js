const app = require("express").Router();
const Blog = require("../models/blog");

app.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
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

    if (!blogData.title || !blogData.url) {
      return response.status(400).json({ error: "Title and URL are required" });
    }

    const blog = new Blog(request.body);

    if (!blog.likes) {
      blog.likes = 0;
    }

    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    next(new Error(error));
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
