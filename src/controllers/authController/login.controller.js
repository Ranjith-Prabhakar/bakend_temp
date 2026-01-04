const authService = require("../../services/auth.service");
const {
  accessTokenOptions,
  refreshTokenOptions,
} = require("../../configs/cookie");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const { accessToken, refreshToken, user } = await authService.login(
    email,
    password,
    req
  );

  res.cookie("accessToken", accessToken, accessTokenOptions);
  res.cookie("refreshToken", refreshToken, refreshTokenOptions);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: user,
  });
};

module.exports = {
  loginController,
};
