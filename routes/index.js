const express = require("express");
const auth = require("./auth.js");
const users = require("./users.js");
const posts = require("./posts.js");
const router = express.Router();

router.use("/users", users);
router.use("/auth", auth);
router.use("/posts", posts);
module.exports = router;
