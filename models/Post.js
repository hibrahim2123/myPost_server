const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    minglength: [8, "please provide a title at least 8 characters"],
  },
  message: {
    type: String,
    required: [true, "Please provide a message"],
    minglength: [20, "please provide content at least 20 characters"],
  },
  slug: String,

  likeCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

PostSchema.pre("save", function (next) {
  if (!this.isModified("title")) {
    next();
  }
  this.slug = this.makeSlug();
  next();
});
PostSchema.methods.makeSlug = function () {
  return slugify(this.title, {
    replacement: "-",
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });
};
module.exports = mongoose.model("PostMessage", PostSchema);
