const express = require("express");

const appLevelMiddleWares = require("./middlewares/appLevelMiddleWares");
const { baseUrl } = require("./config/app");
const routes = require("./routes");
const globalErrorHandler = require("./middlewares/errorHandler");
const pageNotFound = require("./middlewares/pageNotFound.middleware");

const app = express();

appLevelMiddleWares(app);

app.use(baseUrl, routes());

app.use(pageNotFound);

app.use(globalErrorHandler);

module.exports = app;
