const { default: ApiError } = require("../utils/ApiError");

const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errorMessages = error.details.map((detail) => detail.message);
            return next(new ApiError(`Validation failed: ${errorMessages.join(', ')}`, 400));
        }

        next();
    };
};

module.exports = validate;
