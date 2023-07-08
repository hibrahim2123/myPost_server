const express = require("express");
const {
  getAccessToRouter,
  getQuestionOwnerAccess,
} = require("../middlewares/autharization/auth.js");
const {
  checkQuestionExist,
} = require("../middlewares/database/databaseError.js");
const {
  askNewPost,
  getAllPosts,
  getSinglePost,
  editPost,
  deletePost,
  likeQuestion,
  cancelLikePost,
} = require("../controllers/posts.js");

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", checkQuestionExist, getSinglePost);
router.get("/:id/like", [getAccessToRouter, checkQuestionExist], likeQuestion);
//cancelLike sıkıntılı bak ona
router.get(
  "/:id/cancelLike",
  [getAccessToRouter, checkQuestionExist],
  cancelLikePost
);
router.post("/askNewQuestion", getAccessToRouter, askNewPost);
router.put(
  "/:id/edit",
  [getAccessToRouter, checkQuestionExist, getQuestionOwnerAccess],
  editPost
);
router.delete(
  "/:id/delete",
  [getAccessToRouter, checkQuestionExist, getQuestionOwnerAccess],
  deletePost
);

module.exports = router;
