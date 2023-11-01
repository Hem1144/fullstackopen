const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};
const zeroLike = (blogs) => {
  return 0;
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  return blogs.reduce((maxLikedBlog, blog) => {
    return blog.likes > maxLikedBlog.likes ? blog : maxLikedBlog;
  }, blogs[0]);
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const blogCounts = {};
  blogs.forEach((blog) => {
    if (!blogCounts[blog.author]) {
      blogCounts[blog.author] = 1;
    } else {
      blogCounts[blog.author]++;
    }
  });

  const maxAuthor = Object.keys(blogCounts).reduce((max, author) =>
    blogCounts[author] > blogCounts[max] ? author : max
  );

  return { author: maxAuthor, blogs: blogCounts[maxAuthor] };
};

module.exports = {
  dummy,
  totalLikes,
  zeroLike,
  favoriteBlog,
  mostBlogs
};
