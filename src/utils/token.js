const jwt = require("jsonwebtoken");
const {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ISSUER,
  JWT_AUDIENCE,
} = require("../configs/env");

const generateAccessToken = ({ userId, role }) => {
  return jwt.sign(
    {
      userId,
      role,
      tokenType: "access",
    },
    JWT_ACCESS_SECRET,
    {
      expiresIn: "15m",
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    }
  );
};

const generateRefreshToken = ({ userId, sessionId }) => {
  return jwt.sign(
    {
      userId,
      sid: sessionId,
      tokenType: "refresh",
    },
    JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    }
  );
};

const verifyToken = (token, secret, expectedType) => {
  const decoded = jwt.verify(token, secret, {
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
  });

  if (expectedType && decoded.tokenType !== expectedType) {
    throw new Error("Invalid token type");
  }

  return decoded;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
};
