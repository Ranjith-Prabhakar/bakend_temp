const express = require("express");
const tryCatchHandler = require("../utils/tryCatch");
const validate = require("../middlewares/genericValidator");
const { signupSchema, loginSchema } = require("../validators/authValidators");
const authMiddleware = require("../middlewares/authMiddleware");

const {
  signupController,
  loginController,
  refreshController,
} = require("../controllers/authController");

function authRoutes() {
  const router = express.Router();
  router.post(
    "/signup",
    validate(signupSchema),
    tryCatchHandler(signupController)
  );
  router.post(
    "/login",
    validate(loginSchema),
    tryCatchHandler(loginController)
  );
  router.get("/refresh", tryCatchHandler(refreshController));

  return router;
}

module.exports = authRoutes;
