const { verifyToken } = require("../../utils/token");
const { JWT_REFRESH_SECRET } = require("../../config/env");
const { deleteSession } = require("../../utils/session.utils");

const logout = async (refreshToken) => {
  if (!refreshToken) {
    return;
  }

  let decoded;
  try {
    decoded = verifyToken(refreshToken, JWT_REFRESH_SECRET);
  } catch {
    return;
  }

  const { sid } = decoded;
  if (!sid) return;

  await deleteSession(sid);
};

module.exports = logout;
