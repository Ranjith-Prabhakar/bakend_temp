const jwt = require("jsonwebtoken");
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = require("../config/env");

const generateAccessToken = ({ userId, role }) => {
  return jwt.sign(
    {
      userId,
      tokenType: "access",
    },
    JWT_ACCESS_SECRET,
    {
      expiresIn: "15m",
    }
  );
};

const generateRefreshToken = ({ userId, role, sessionId }) => {
  return jwt.sign(
    {
      userId,
      sid: sessionId,
      tokenType: "refresh",
    },
    JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

const verifyToken = (token, secret) => {
  const decoded = jwt.verify(token, secret);
  return decoded;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
};
