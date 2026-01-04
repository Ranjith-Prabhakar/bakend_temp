const User = require('../models/user.model');
// Save refresh token
const updateUserRefreshToken = async (userId, refreshToken) => {
  return await User.findByIdAndUpdate(
    userId,
    { refreshToken, isLoggedIn: true },
    { new: true }
  );
};

module.exports = updateUserRefreshToken