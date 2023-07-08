const User = require("../../models/User.js");
const CustomError = require("../../error/customError.js");
const Question = require("../../models/Post.js");
const checkUserExist = async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(new CustomError("There is not any user with that id", 400));
  }
  next();
};

const checkQuestionExist = async (req, res, next) => {
  const { id } = req.params;
  const question = await Question.findById(id);

  if (!question) {
    return next(
      new CustomError("There is not any question with that user", 400)
    );
  }
  next();
};

module.exports = { checkUserExist, checkQuestionExist };
