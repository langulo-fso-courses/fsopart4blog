const mongoose = require("mongoose");
const supertest = require("supertest"); // Supertest lib for API testing
const app = require("../app"); // Our (main) app to test
const Blog = require("../models/blog"); // The Blog mongoose model

const api = supertest(app);

// You can choose to run only a single test by using jest directly from the command line like:
// npx jest -t 'nameOfTheTest'

// test setup
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

beforeEach(async () => {
  await Blog.deleteMany({}); // Clear the test DB
  for (blog of initialBlogs) {
    await new Blog(blog).save();
  }
});

// Test case for supertest lib
// Note the use of "async-await" instead of thenable chaining
test("get all blogs", async () => {
  // declare the callback as async function
  await api // await until the resolution of the promise
    .get("/api/blogs")
    .expect(200)  // This chaining works because "expect()" returns itself. matchers like "toBe()" CANNOT be chained this way
    .expect("Content-Type", /application\/json/);
});

test("there are two blogs", async done => {
  const res = await api.get("/api/blogs");
  expect(res.body.length).toBe(2); // This will only run after the "await" instruction is finished
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

// Close the connection at the end, no matter what
afterAll(() => mongoose.connection.close());
