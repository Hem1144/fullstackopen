const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};
const zeroLike = (blogs) => {
  return 0
};

module.exports = {
  dummy,
  totalLikes,
  zeroLike
};
