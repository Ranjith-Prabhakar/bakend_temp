const authService = require("../../services/auth.service");
const { refreshTokenOptions } = require("../../config/cookie");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const { accessToken, refreshToken, user } = await authService.login(
    email,
    password,
    req
  );

  res.cookie("refreshToken", refreshToken, refreshTokenOptions);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: { accessToken, user },
  });
};

module.exports = {
  loginController,
};
