const authRepository = require('../repositories/auth.repository');
const ApiError = require('../utils/ApiError'); // your global error helper
const httpStatus = require('http-status'); // optional, use constants for status codes
const {generateAccessToken,generateRefreshToken} = require('../utils/token')
const {comparePassword} = require('../../utils/hash.utils')

const login = async (email, password) => {
  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
  }

  const isMatch = await comparePassword(password,user.password);

  if (!isMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
  }

  const accessToken = generateAccessToken({ id: user._id, email: user.email });
  const refreshToken = generateRefreshToken({ id: user._id, email: user.email });

  // Save refresh token and mark as logged in
  await authRepository.updateUserRefreshToken(user._id, refreshToken);

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

module.exports = login