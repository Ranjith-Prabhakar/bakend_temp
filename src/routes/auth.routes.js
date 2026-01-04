const express = require("express");
const tryCatchHandler = require("../utils/tryCatch");
const validate = require("../middlewares/genericValidator");
const { signupSchema, loginSchema } = require("../validators/authValidators");

const {
  signupController,
  loginController,
  refreshController,
  logutController,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

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
  router.get("/logout", authMiddleware, tryCatchHandler(logutController));

  return router;
}

module.exports = authRoutes;
