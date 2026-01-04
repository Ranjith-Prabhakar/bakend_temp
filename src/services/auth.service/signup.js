const authRepository = require('../repositories/auth.repository');
const ApiError = require('../utils/ApiError'); 
const httpStatus = require('http-status');
const {hashPassword} = require('../../utils/hash.utils')

const signup = async (userData) => {
  const existingUser = await authRepository.findUserByEmail(userData.email);

  if (existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already in use');
  }

  user.password = await hashPassword(user.password)
  const user = await authRepository.createUser(userData);

  const userObj = user.toObject();
  delete userObj.password;

  return userObj;
};

module.exports = signup
