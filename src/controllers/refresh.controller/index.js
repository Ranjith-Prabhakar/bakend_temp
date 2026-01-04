const createAccessToken = require('../../services/refreshToken.service');
const { refreshTokenOptions } = require('../../config/cookie');

async function refreshController(req, res, next) {
  
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ success: false, message: 'No refresh token provided' });
    }

    const { accessToken, newRefreshToken } = await createAccessToken(refreshToken);

    // Set new refresh token cookie
    res.cookie('refreshToken', newRefreshToken,refreshTokenOptions )
      .status(200)
      .json({
        success: true,
        message: 'Access token refreshed',
        accessToken,
      });

}

module.exports = refreshController ;
