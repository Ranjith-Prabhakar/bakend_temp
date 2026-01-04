const { default: ApiError } = require("../utils/ApiError");

function pageNotFound(req,res,next){
next(new ApiError(404,'Resource Not Found'))
}

module.exports = pageNotFound