const { verifyToken, generateAccessToken, generateRefreshToken } = require('../../utils/token');
const { JWT_REFRESH_SECRET } = require('../../config/env');
const ApiError = require('../../utils/ApiError');
const findUserById = require('../../repositories/user.repository/findUserById')

async function createAccessToken(refreshToken) {

  const  decoded = verifyToken(refreshToken, JWT_REFRESH_SECRET);

  if (!decoded || !decoded._id) {
    throw new ApiError(401, 'Invalid refresh token payload');
  }

  // Find user and check refresh token validity
  const user = await findUserById({ _id: decoded._id });
  if (!user || !user.isLoggedIn) {
    throw new ApiError(401, 'Invalid or revoked refresh token');
  }

  // Generate new access token
  const accessToken = generateAccessToken({ _id: user._id, email: user.email });

  // 🔄 ROTATE refresh token: generate new one
  const newRefreshToken = generateRefreshToken({ _id: user._id, email: user.email });

  // Save new refresh token in DB (replace old one)
  user.refreshToken = newRefreshToken;
  await user.save();

  // Return both tokens
  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
}

module.exports = createAccessToken;
