const CustomError = require("../../error/customError.js");
const jwt = require("jsonwebtoken");
const {
  isTokenIncluded,
  getAccessTokenFromHeader,
} = require("../../helpers/helperAuth.js");
const Question = require("../../models/Post.js");

const getAccessToRouter = (req, res, next) => {
  const { MY_SECRET_KEY } = process.env;

  //Is token included
  const existingOfToken = isTokenIncluded(req);

  if (!existingOfToken) {
    return next(new CustomError("Token is not created"));
  }

  //Get token from header
  const token = getAccessTokenFromHeader(req);

  //Control if token is valid or not
  jwt.verify(token, MY_SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return next(
        new CustomError("You are not authorized to access this page", 401)
      );
    }
    req.user = {
      id: decodedToken.id,
      name: decodedToken.name,
    };
  });
  next();
};

const getQuestionOwnerAccess = async (req, res, next) => {
  const userId = req.user.id;
  const questionId = req.params.id;

  const question = await Question.findById(questionId);

  if (question.user != userId) {
    return next(new CustomError("Only owner can handle this opeartion", 403));
  }
  next();
};

module.exports = { getAccessToRouter, getQuestionOwnerAccess };
