const authRepository = require("../repositories/auth.repository");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");
const { comparePassword } = require("../../utils/hash.utils");
const redis = require("../../config/redis");
const { v4: uuidv4 } = require("uuid");

const login = async (email, password, req) => {
  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid email or password");
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid email or password");
  }

  const sessionId = uuidv4();

  const sessionKey = `session:${sessionId}`;

  await redis.set(
    sessionKey,
    JSON.stringify({
      userId: user._id,
      role: user.role,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    }),
    "EX",
    60 * 60 * 24 * 7
  );

  const accessToken = generateAccessToken({
    userId: user._id,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    userId: user._id,
    sessionId,
  });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

module.exports = login;
