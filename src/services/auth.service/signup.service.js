const authRepository = require("../../repositories/auth.repository");
const ApiError = require("../../utils/ApiError");
const { hashPassword } = require("../../utils/hashing");

const signup = async (userData) => {
  const existingUser = await authRepository.findUserByEmail(userData.email);

  if (existingUser) {
    throw new ApiError(409, "Email already in use");
  }

  const hashedPassword = await hashPassword(userData.password);

  const user = await authRepository.createUser({
    ...userData,
    password: hashedPassword,
  });

  const userObj = user.get({ plain: true });
  delete userObj.password;

  return userObj;
};

module.exports = signup;
