const User = require("../../../models/user");

const findUserById = async (id) => {
  return await User.findOne({
    where: { id },
  });
};

module.exports = findUserById;
