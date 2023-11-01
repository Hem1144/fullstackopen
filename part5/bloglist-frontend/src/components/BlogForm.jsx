const BlogForm = ({ addBlog, newBlog, handleChange }) => (
  <form onSubmit={addBlog}>
    <label htmlFor="title">Title: </label>
    <input
      value={newBlog.title}
      name="title"
      onChange={handleChange}
      placeholder="title..."
    />
    <br />
    <label htmlFor="author">Author: </label>
    <input
      value={newBlog.author}
      name="author"
      onChange={handleChange}
      placeholder="Author..."
    />
    <br />
    <label htmlFor="url">URL: </label>
    <input
      value={newBlog.url}
      name="url"
      onChange={handleChange}
      placeholder="url..."
    />
    <br />
    <button type="submit">Create</button>
  </form>
);

export default BlogForm;
