const express = require("express");
const { getSingleUser, getAllUsers } = require("../controllers/users.js");
const { checkUserExist } = require("../middlewares/database/databaseError.js");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", checkUserExist, getSingleUser);
module.exports = router;
