const listHelper = require("../utils/list_helper");

// Dummy test
test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

// Test for total likes function
describe("total likes", () => {
  // Mock data for test cases
  const oneBlogList = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    }
  ];

  const manyBlogList = [
    {
      _id: "5a422aa71b54a676234d1755",
      title: "First post",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f7",
      title: "Other post",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Null Statement",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 15,
      __v: 0
    }
  ];

  const noBlogList = [];

  test("if list.length === 1, return list[0].likes", () => {
    const result = listHelper.totalLikes(oneBlogList);
    expect(result).toBe(5);
  });

  test("if list.length > 1, return sumtotal of likes", () => {
    const result = listHelper.totalLikes(manyBlogList);
    expect(result).toBe(30);
  });

  test("if list.length < 1, return 0", () => {
    const result = listHelper.totalLikes(noBlogList);
    expect(result).toBe(0);
  });
});

// Test for blog post with the most likes
describe("favorite blog post", () => {
  const thirdFavList = [
    {
      _id: "5a422aa71b54a676234d1755",
      title: "First post",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f7",
      title: "Other post",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Null Statement",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 15,
      __v: 0
    }
  ];

  test("in a list of blogs with different amounts of likes, find the most liked", () => {
    const result = listHelper.favoriteBlog(thirdFavList);
    const favorite = thirdFavList[2]; // blog with 15 likes
    expect(result).toEqual(favorite);
  });

  const manyFavList = [
    {
      _id: "5a422aa71b54a676234d1755",
      title: "First post",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f7",
      title: "Other post",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 15,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Null Statement",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 15,
      __v: 0
    }
  ];

  test("in a list of blogs with some equal amounts of likes, find the first with equal likes", () => {
    const result = listHelper.favoriteBlog(manyFavList);
    const favorite = manyFavList[1]; // second blog post
    expect(result).toEqual(favorite);
  });
});

// Test for author with the most blog posts
describe("most blogs", () => {
  const manyBlogList = [
    {
      _id: "5a422aa71b54a676234d1755",
      title: "First post",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f7",
      title: "Other post",
      author: "Robert C. Martin",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "I hate Nate",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 15,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17a7",
      title: "I like turtles",
      author: "Robert C. Martin",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17d8",
      title: "Go To Null Statement",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 15,
      __v: 0
    }
  ];

  test("Author with the most blogs", () => {
    const result = listHelper.mostBlogs(manyBlogList);
    const expected = {
      author: "Edsger W. Dijkstra",
      blogs: 3
    };
    expect(result).toEqual(expected);
  });
});

// Test for author with the most blog posts
describe("most likes", () => {
  const manyBlogList = [
    {
      _id: "5a422aa71b54a676234d1755",
      title: "First post",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f7",
      title: "Other post",
      author: "Robert C. Martin",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "I hate Nate",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 15,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17a7",
      title: "I like turtles",
      author: "Robert C. Martin",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17d8",
      title: "Go To Null Statement",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 15,
      __v: 0
    }
  ];

  test("Author with the most likes", () => {
    const result = listHelper.mostLikes(manyBlogList);
    const expected = {
      author: "Edsger W. Dijkstra",
      likes: 40
    };
    expect(result).toEqual(expected);
  });
});
