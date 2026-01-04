const authService = require("../../services/auth.service");

const signupController = async (req, res) => {
  const user = await authService.signup(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
};

module.exports = signupController;
