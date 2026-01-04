const { default: ApiError } = require('../utils/ApiError');
const { verifyToken } = require('../utils/token');
const { JWT_ACCESS_SECRET } = require('../config/env');
const { isUserLoggedIn } = require('../repositories/user.repository');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    let accessToken
    if (authHeader && authHeader.startsWith('Bearer ')) {
      accessToken = authHeader.split(' ')[1]; // This gets the token part
      if (!accessToken) {
        throw new ApiError(401, 'Access token required');
      }
    } else {
      console.log('Authorization header not found or invalid format');
    }


    let decoded;
    try {
      decoded = verifyToken(accessToken, JWT_ACCESS_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new ApiError(401, 'Access token expired');
      } else {
        throw new ApiError(401, 'Invalid access token');
      }
    }

    req.user = decoded;
    return next();

  } catch (error) {
    console.log(error);
    next(error); // Properly forward to error handling middleware
  }
};

module.exports = authMiddleware;
