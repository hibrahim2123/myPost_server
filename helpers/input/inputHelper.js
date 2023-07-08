const bcrypt = require("bcryptjs");

const validateInput = (email, password) => {
  return email && password;
};

const comparePasswords = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
module.exports = {
  validateInput,
  comparePasswords,
};
