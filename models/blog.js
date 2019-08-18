// The blog model for Mongoose.js
const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    minlength: [5, "title is below 5 chars"],
    maxlength: [100, "title exceeds 100 chars"]
  },
  author: {
    type: String,
    minlength: [5, "author is below 5 chars"],
    maxlength: [100, "author exceeds 100 chars"]
  },
  url: String,
  likes: Number
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Blog", blogSchema);
