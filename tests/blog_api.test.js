const mongoose = require("mongoose");
const supertest = require("supertest"); // Supertest lib for API testing
const app = require("../app"); // Our (main) app to test

const api = supertest(app);

// Test case for supertest lib
// Note the use of "async-await" instead of thenable chaining
test("get all blogs", async () => {  // declare the callback as async function
  await api  // await until the resolution of the promise
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

// Close the connection at the end, no matter what
afterAll(() => mongoose.connection.close());
