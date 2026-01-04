const { createAccessToken } = require("../../services/refresh.service");
const { refreshTokenOptions } = require("../../config/cookie");

async function refreshController(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new ApiError(401, "Unauthorized");
  }

  const { accessToken, refreshToken: newRefreshToken } =
    await createAccessToken(refreshToken);

  res
    .cookie("refreshToken", newRefreshToken, refreshTokenOptions)
    .status(200)
    .json({
      success: true,
      accessToken,
    });
}

module.exports = refreshController;
