const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    const blogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu",
        likes: 0,
        __v: 0,
      },
    ];

    const result = listHelper.zeroLike(blogs);
    expect(result).toBe(0);
  });

  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
});

describe("favorite blog", () => {
  const blogs = [
    {
      title: "Blog 1",
      author: "Author 1",
      likes: 10,
    },
    {
      title: "Blog 2",
      author: "Author 2",
      likes: 15,
    },
    {
      title: "Blog 3",
      author: "Author 3",
      likes: 12,
    },
  ];

  test("finds the blog with the most likes", () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({
      title: "Blog 2",
      author: "Author 2",
      likes: 15,
    });
  });
});

describe("most blogs", () => {
  test("returns the author with most blogs", () => {
    const blogs = [
      { author: "Author A" },
      { author: "Author B" },
      { author: "Author A" },
      { author: "Author C" },
    ];
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({
      author: "Author A",
      blogs: 2,
    });
  });

  test("returns null for empty list", () => {
    const blogs = [];
    const result = listHelper.mostBlogs(blogs);
    expect(result).toBe(null);
  });
});
