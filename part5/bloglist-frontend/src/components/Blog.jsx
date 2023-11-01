import { useState } from "react";

const Blog = ({ blog, updateLikes, blogOwner }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const [blogToShow, setBlogToShow] = useState([]);
  if (blogToShow.includes(blog.id)) {
    return (
      <div style={blogStyle}>
        <p>
          {blog.title}
          <button
            onClick={() =>
              setBlogToShow(blogToShow.filter((id) => id !== blog.id))
            }
          >
            hide
          </button>
          <br />
          URL: {blog.url}
          <br />
          Likes: {blog.likes} <button onClick={updateLikes}>Like</button>
          <br />
          {blog.author}
          <br />
          {blogOwner}
        </p>
      </div>
    );
  }
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setBlogToShow(blogToShow.concat(blog.id))}>
        show
      </button>
    </div>
  );
};

export default Blog;
