// The blogs controller
const router = require("express").Router();
const blogModel = require("../models/blog");

// All the promise chains have been replaced with async/await
router.get("/", async (req, res) => {
  const blogs = await blogModel.find({});
  res.json(blogs.map(blog => blog.toJSON()));
});

router.get("/:id", async (req, res, next) => {
  // .catch on thenable chain is replaced with plain try-catch block
  try {
    const blog = await blogModel.findById(req.params.id);
    if (blog) {
      res.json(blog.toJSON());
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

// create a new blog in the db
router.post("/", async (req, res, next) => {
  const body = req.body;
  try {
    const blog = new blogModel({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    });
    await blog.save();
    res.json(blog.toJSON());
  } catch (error) {
    next(error);
  }
});

// 
router.delete("/:id", (req, res, next) => {
  try {
    blogModel.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.put("/:id", (req, res, next) => {
  const body = req.body;
  // TODO: change for blog body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  };
  try {
    blogModel.findByIdAndUpdate(req.params.id, blog, { new: true });
    res.json(blog.toJSON());
  } catch (error) {
    next(error);
  }
});

// Node style export for the express router
module.exports = router;
