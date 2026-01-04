const {
  verifyToken,
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/token");
const { JWT_REFRESH_SECRET } = require("../../config/env");
const ApiError = require("../../utils/ApiError");
const { saveSession, getSession } = require("../../utils/session.utils");

async function updateTokens(refreshToken) {
  const decoded = verifyToken(refreshToken, JWT_REFRESH_SECRET);
  const { userId, sid, role } = decoded;

  const session = await getSession(sid);
  if (!session) {
    throw new ApiError(401, "Session expired");
  }

  if (session.refreshToken !== refreshToken) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const accessToken = generateAccessToken({ userId, role });
  const newRefreshToken = generateRefreshToken({ userId, sessionId: sid });

  await saveSession(sid, {
    id: session._id,
    role: session.role,
    name: session.name,
    email: session.email,
    refreshToken: newRefreshToken,
  });

  return {
    accessToken,
    refreshToken: newRefreshToken,
    user: {
      id: session._id,
      role: session.role,
      name: session.name,
      email: session.email,
    },
  };
}

module.exports = updateTokens;
