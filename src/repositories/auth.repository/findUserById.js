const User = require('../models/user.model');

// Find user by email
const findUserById = async (id) => {
  return await User.findById(id);
};

module.exports = findUserById