const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const express = require("express");
const rateLimitOptions = require("../config/rateLimit");
const corsOptions = require("../config/cors");

function appLevelMiddleWares(app) {
  app.use(helmet());
  app.use(mongoSanitize());
  app.use(rateLimit(rateLimitOptions));
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
}

module.exports = appLevelMiddleWares;
