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
  const mostLikes = Math.max(...blogs.map(blog => blog.likes));
  // return the blog with the most likes
  return blogs.find(blog => blog.likes === mostLikes);
};

favoriteBlog([
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
]);

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
