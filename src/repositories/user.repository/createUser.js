const User = require('../models/user.model');

// Create user
const createUser = async (userData) => {
  return await User(userData).save();
};

module.exports = createUser