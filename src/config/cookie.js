const { NODE_ENV } = require("./env");

const refreshTokenOptions = {
  httpOnly: true,
  secure: NODE_ENV === "production",
  sameSite: "none",
  path: "/auth/refresh",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

module.exports = {
  refreshTokenOptions,
};
