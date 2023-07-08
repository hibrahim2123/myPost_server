const express = require("express");
const { getAccessToRouter } = require("../middlewares/autharization/auth.js");
const {
  register,

  login,
  logout,
  updateUser,
} = require("../controllers/auth.js");

const router = express.Router();
router.get("/", (req, res) => {
  res.send("merhaba");
});
router.post("/register", register);

router.post("/login", login);
router.get("/logout", getAccessToRouter, logout);
router.put("/edit", getAccessToRouter, updateUser);
module.exports = router;
