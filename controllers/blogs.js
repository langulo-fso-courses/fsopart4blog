// The blogs controller
const router = require("express").Router();
const blogModel = require("../models/blog");

router.get("/", (req, res) => {
  blogModel.find({}).then(blogs => {
    res.json(blogs.map(blog => blog.toJSON()));
  });
});

router.get("/:id", (req, res, next) => {
  blogModel
    .findById(req.params.id)
    .then(blog => {
      if (blog) {
        res.json(blog.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

router.post("/", (req, res, next) => {
  const body = req.body;
  // TODO: change for blog body
  const blog = new blogModel({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  });

  blog
    .save()
    .then(savedBlog => {
      res.json(savedBlog.toJSON());
    })
    .catch(error => next(error));
});

router.delete("/:id", (req, res, next) => {
  blogModel
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch(error => next(error));
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

  blogModel
    .findByIdAndUpdate(req.params.id, blog, { new: true })
    .then(updatedNote => {
      res.json(updatedNote.toJSON());
    })
    .catch(error => next(error));
});

// Node style export for the express router
module.exports = router;
