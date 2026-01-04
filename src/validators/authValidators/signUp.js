const Joi = require("joi");

const signupSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])")
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must include uppercase, lowercase, number, and special character.",
    }),
  role: Joi.string().min(3).max(50).required(),
});

module.exports = signupSchema;
