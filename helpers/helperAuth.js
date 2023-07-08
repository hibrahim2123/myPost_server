const sendTokenToClient = (user, res, status) => {
  //Get Token From User Model

  const token = user.getTokenFromUserModel();

  const { JWT_EXPIRE, NODE_ENV } = process.env;

  //Send that token to client with res

  return res
    .status(status)
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(JWT_EXPIRE) * 20 * 1000 * 60),
      secure: NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      token,
      data: {
        mane: user.name,
        email: user.email,
        role: user.role,
      },
    });
};

const isTokenIncluded = (req) => {
  return req.headers && req.headers.authorization.startsWith("Bearer:");
};
const getAccessTokenFromHeader = (req) => {
  const authorization = req.headers.authorization;

  const token = authorization.split(":")[1];

  return token;
};
module.exports = {
  sendTokenToClient,
  isTokenIncluded,
  getAccessTokenFromHeader,
};
