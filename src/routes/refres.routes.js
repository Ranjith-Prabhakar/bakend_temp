const express = require('express');
const refreshController = require('../controllers/refresh.controller');

function refreshRoute(tryCatchHandler) {
    const router = express.Router();

    router.get('/refresh', tryCatchHandler(refreshController));

    return router;
}

module.exports = refreshRoute;