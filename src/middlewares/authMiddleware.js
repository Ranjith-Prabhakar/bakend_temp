const ApiError = require("../utils/ApiError");
const { verifyToken } = require("../utils/token");
const { JWT_ACCESS_SECRET } = require("../configs/env");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError(401, "Unauthorized"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token, JWT_ACCESS_SECRET, "access");
    req.user = decoded;
    next();
  } catch {
    next(new ApiError(401, "Unauthorized"));
  }
};

module.exports = authMiddleware;
