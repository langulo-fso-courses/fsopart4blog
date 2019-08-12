// List of blogs for devtests
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

const dummy = blogs => {
  return 1;
};

/**
 * Returns the sum of all likes in the arg collection of blog posts
 * @param {*} blogs An array of blogposts
 */
const totalLikes = blogs => {
  // Without an explicit initial value '0', the first element in the array will be used and skipped.
  // Here, it would use a blog object and then return that instead of the number value of likes
  return blogs.reduce((likesTotal, blog) => likesTotal + blog.likes, 0);
};

/**
 * Takes an array of blogs and returns the blog in the list with the most likes
 * @param {*} blogs an array of blog elements
 */
const favoriteBlog = blogs => {
  // get the highest number of likes
  const likes = Math.max(...blogs.map(blog => blog.likes));
  // return the blog with the most likes
  return blogs.find(blog => blog.likes === likes);
};

/**
 * Returns a js obj with the name of the author with the most blogs and the number of blogs to his name
 * @param {*} blogs An array of blogs
 */
const mostBlogs = blogs => {
  // count the number of blogs with the same author
  let authorBlogCount = {};
  blogs.forEach(blog => {
    // Using the authors names as keys allows simple existence check
    if (blog.author in authorBlogCount) {
      authorBlogCount[blog.author].blogs += 1;
    } else {
      authorBlogCount[blog.author] = { author: blog.author, blogs: 1 };
    }
  });

  // find and return the author with the most blogs
  let topAuthor = { blogs: 0 };
  for (key in authorBlogCount) {
    if (authorBlogCount[key].blogs > topAuthor.blogs) {
      topAuthor = authorBlogCount[key];
    }
  }
  return topAuthor;
};

const mostLikes = blogs => {
  // split the blog array into groups by author
  let authorLikeCount = {};
  blogs.forEach(blog => {
    // Using the authors names as keys allows simple existence check
    if (blog.author in authorLikeCount) {
      authorLikeCount[blog.author].likes += blog.likes;
    } else {
      authorLikeCount[blog.author] = { author: blog.author, likes: blog.likes };
    }
  });

  // compare group totals and return the highest
  let topAuthor = { likes: 0 };
  for (key in authorLikeCount) {
    if (authorLikeCount[key].likes > topAuthor.likes) {
      topAuthor = authorLikeCount[key];
    }
  }
  return topAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
