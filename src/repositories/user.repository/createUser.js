const User = require("../../../models/user");

const createUser = async (userData) => {
  return await User.create(userData);
};

module.exports = createUser;
