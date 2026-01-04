const User = require('../../models/user.model');

async function isUserLoggedIn(userId,refreshToken) {
 const user = await User.findById(userId)
 if(user.isLoggedIn && user.refreshToken === refreshToken) return true
 else return false
}

module.exports = isUserLoggedIn;
