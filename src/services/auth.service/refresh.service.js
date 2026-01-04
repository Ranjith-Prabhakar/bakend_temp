const {
  verifyToken,
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/token");
const { JWT_REFRESH_SECRET } = require("../../config/env");
const redis = require("../../config/redis");
const ApiError = require("../../utils/ApiError");

async function createAccessToken(refreshToken) {
  const decoded = verifyToken(refreshToken, JWT_REFRESH_SECRET, "refresh");

  const { userId, sid } = decoded;

  const session = await redis.get(`session:${sid}`);
  if (!session) {
    throw new ApiError(401, "Session expired");
  }

  const accessToken = generateAccessToken({ userId });

  const newRefreshToken = generateRefreshToken({
    userId,
    sessionId: sid,
  });

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
}

module.exports = createAccessToken;
