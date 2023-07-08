const User = require("../models/User.js");
const { sendTokenToClient } = require("../helpers/helperAuth.js");
const {
  validateInput,
  comparePasswords,
} = require("../helpers/input/inputHelper.js");
const CustomError = require("../error/customError.js");
const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name: name,
    email: email,
    password: password,
  });
  sendTokenToClient(user, res, 200);
};

const getUser = (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      name: req.user.name,
      id: req.user.id,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const isValidate = validateInput(email, password);
  if (!isValidate) {
    return next(new CustomError("Please check your inputs", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  const isPasswordsSame = comparePasswords(password, user.password);
  if (!isPasswordsSame) {
    return next(new CustomError("Please check your credentials", 400));
  }
  sendTokenToClient(user, res, 200);
};

const logout = (req, res) => {
  const { NODE_ENV } = process.env;

  return res
    .status(200)
    .cookie({
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message: "Logout Successfully",
    });
};

const updateUser = async (req, res) => {
  const updateDetails = req.body;

  const user = await User.findByIdAndUpdate(req.user.id, updateDetails, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Details Updated",
    data: user,
  });
};
module.exports = {
  register,
  getUser,
  login,
  logout,
  updateUser,
};
