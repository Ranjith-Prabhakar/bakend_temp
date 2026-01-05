const { logout } = require("../../services/auth.service/logout.service.js");
const { refreshTokenOptions } = require("../../config/cookie");

const logoutController = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  await logout(refreshToken);

  res.clearCookie("refreshToken", refreshTokenOptions);

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

module.exports = logoutController;
