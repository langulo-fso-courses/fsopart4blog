const mongoose = require("mongoose");
const supertest = require("supertest"); // Supertest lib for API testing
const app = require("../app"); // Our (main) app to test
const helper = require("./test_helper"); // test helper
const Blog = require("../models/blog");
const api = supertest(app); // Supertest wrapper for the api to test

// You can choose to run only a single test by using jest directly from the command line like:
// npx jest -t 'nameOfTheTest'

// Reset the database
beforeEach(async () => {
  await Blog.deleteMany({}); // Clear the test DB
  for (blogData of helper.initialBlogs) {
    await new Blog(blogData).save();
  }
});

// Note the use of "async-await" instead of thenable chaining
test("blogs are returned as json", async () => {
  // declare the callback as async function
  await api // await until the resolution of the promise
    .get("/api/blogs")
    .expect(200) // This chaining works because "expect()" returns itself. matchers like "toBe()" CANNOT be chained this way
    .expect("Content-Type", /application\/json/);
});

test("api returns all blogs", async done => {
  const res = await api.get("/api/blogs");
  expect(res.body.length).toBe(helper.initialBlogs.length); // This will only run after the "await" instruction is finished
  done(); // This is necessary when using async callbacks to prevent jest from exiting the process too soon
});

test("the contents of the first blog have been saved correctly", async done => {
  // await can only be used inside async functions, on expressions that return a promise
  const res = await api.get("/api/blogs");
  expect(res.body[0].title).toBe("Voyager");
  expect(res.body[0].author).toBe("Arthur C. Clarke");
  expect(res.body[0].url).toBe("https://some-anon.geospaces.net");
  expect(res.body[0].likes).toBe(5);
  done();
});

test("post a new blog", async done => {
  const newBlog = {
    title: "Spear of justice",
    author: "strongfish92",
    url: "https://undyne.geospaces.net",
    likes: 9001
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/); // Regex

  const res = await api.get("/api/blogs");

  const serverBlogs = res.body.map(r => r.title);
  expect(res.body.length).toBe(helper.initialBlogs.length + 1);
  expect(serverBlogs).toContain("Spear of justice");
  done();
});

test("try to post a blog with attributes missing", async done => {
  const noTitleBlog = {
    title: "",
    author: "strongfish92",
    url: "https://undyne.geospaces.net",
    likes: 9001
  };

  await api
    .post("/api/blogs")
    .send(noTitleBlog)
    .expect(400); // bad request expected

  const blogs = await helper.blogsInDB();
  expect(blogs.length).toBe(helper.initialBlogs.length); // Blog should NOT have been created
  done();
});

// Close the connection at the end, no matter what
afterAll(() => mongoose.connection.close());
