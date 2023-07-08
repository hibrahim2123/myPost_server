const CustomError = require("../../error/customError.js");

const errorHandler = (err, req, res, next) => {
  let customError = new CustomError(err.message, err.status);

  if (err.name === "SyntaxError") {
    customError = new CustomError("Unexpected Syntax", 400);
  }
  if (err.name === "CastError") {
    customError = new CustomError("Please provide a valid input", 400);
  }
  if (err.name === "ValidationError") {
    customError = new CustomError(err.message, 400);
  }

  if (err.name === "CastError") {
    customError = new CustomError("Please provide a valid input", 400);
  }
  if (err.name === "MongoNetworkError") {
    customError = new CustomError(
      "There is a problem with network , Please try again later",
      500
    );
  }

  console.log(customError);

  return res.status(customError.status || 500).json({
    succcess: false,
    message: customError.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
