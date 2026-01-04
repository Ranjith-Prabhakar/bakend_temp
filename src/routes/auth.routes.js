const express = require('express');
const tryCatchHandler = require('../utils/tryCatch');
const validate = require('../middlewares/genericValidator');
const { signupSchema, loginSchema } = require('../validators/authValidators');
const authMiddleware = require('../middlewares/authMiddleware');
const { signupController, loginController } = require('../controllers/authController');

function authRoutes() {
  const router = express.Router();
    router.post(
    '/signUp',
    validate(signupSchema),
    tryCatchHandler(signupController)
  );
  router.post('/login', validate(loginSchema), tryCatchHandler(loginController));

  return router;
}

module.exports = authRoutes;
