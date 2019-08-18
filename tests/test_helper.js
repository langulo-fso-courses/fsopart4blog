// common testing functions module
const Blog = require("../models/blog"); // Blog model

// seed data for the test db
const initialBlogs = [
  {
    title: "Voyager",
    author: "Arthur C. Clarke",
    url: "https://some-anon.geospaces.net",
    likes: 5
  },
  {
    title: "Synthethic consciousness",
    author: "someAnon99",
    url: "https://some-anon.geospaces.net",
    likes: 7
  }
];

// Ask for a non-existing obj id
const nonExistingId = async () => {
  const blog = new Blog({
    title: "temporary to delete",
    author: "temporary to delete",
    url: "https://to.delete.com",
    likes: 9999
  });
  await blog.save();
  await blog.delete();
  return blog._id.toString();
};

// get the blogs in the db
const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

// Node style exports
module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDB
};
