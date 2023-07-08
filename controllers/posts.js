const Posts = require("../models/Post.js");
const CustomError = require("../error/customError.js");
const Post = require("../models/Post.js");

const askNewPost = async (req, res) => {
  const information = req.body;

  const newPost = await Posts.create({
    ...information,
    user: req.user.id,
  });
  res.status(200).json({
    success: true,
    data: newPost,
  });
};

const getAllPosts = async (req, res) => {
  const allPosts = await Posts.find();

  res.status(200).json({
    success: true,
    allPosts,
  });
};

const getSinglePost = async (req, res) => {
  const { id } = req.params;

  const singlePost = await Posts.findById(id);

  res.status(200).json({
    post: singlePost,
  });
};

const editPost = async (req, res) => {
  const { id } = req.params;
  const updateDetails = req.body;

  let updatedPost = await Posts.findByIdAndUpdate(id, updateDetails, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    message: "Detail Updated",
    data: updatedPost,
  });
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  await Posts.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Post delete operation successfull",
  });
};

const likeQuestion = async (req, res, next) => {
  const { id } = req.params;

  const question = await Post.findById(id);

  if (question.likes.includes(req.user.id)) {
    return next(new CustomError("You already liked this image", 400));
  }

  question.likes.push(req.user.id);
  question.likeCount = question.likeCount + 1;

  await question.save();

  res.status(200).json({
    success: true,
    data: question,
  });
};

const cancelLikePost = async (req, res, next) => {
  const { id } = req.params;

  const question = await Post.findById(id);

  if (!question.likes.includes(req.user.id)) {
    return next(
      new CustomError("You can not undo like operation for this question", 400)
    );
  }
  const index = question.likes.indexOf(req.user.id);

  question.likes.splice(index, 1);
  question.likeCount = question.likeCount - 1;

  await question.save();

  res.status(200).json({
    success: false,
    data: question,
  });
};
module.exports = {
  askNewPost,
  getAllPosts,
  getSinglePost,
  editPost,
  deletePost,
  likeQuestion,
  cancelLikePost,
};
