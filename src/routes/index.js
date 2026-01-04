const express = require("express");

const authRoute = require("./auth.routes");

function routes() {
  const router = express.Router();

  router.use("/auth", authRoute());

  return router;
}

module.exports = routes;
