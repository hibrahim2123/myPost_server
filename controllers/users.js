const User = require("../models/User.js");
const CustomError = require("../error/customError.js");

const getSingleUser = async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  res.status(200).json({
    user,
  });
};

const getAllUsers = async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    users,
  });
};

module.exports = { getSingleUser, getAllUsers };
