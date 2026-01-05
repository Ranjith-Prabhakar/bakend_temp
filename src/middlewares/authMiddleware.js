const ApiError = require("../utils/ApiError");
const { verifyToken } = require("../utils/token");
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = require("../config/env");
const { getSession } = require("../utils/session.utils");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Access token missing");
    }

    const accessToken = authHeader.split(" ")[1];

    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      throw new ApiError(401, "Refresh token missing");
    }

    verifyToken(accessToken, JWT_ACCESS_SECRET);
    const refreshPayload = verifyToken(refreshToken, JWT_REFRESH_SECRET);

    const { sid } = refreshPayload;
    if (!sid) {
      throw new ApiError(401, "Invalid refresh token payload");
    }

    const sessionData = await getSession(sid);
    if (!sessionData) {
      throw new ApiError(401, "Session expired");
    }

    const session = JSON.parse(sessionData);

    if (session.refreshToken !== refreshToken) {
      throw new ApiError(401, "Refresh token mismatch");
    }

    req.user = {
      userId: session.userId,
      name: session.name,
      email: session.email,
      role: session.role,
      sessionId: sid,
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authMiddleware;
