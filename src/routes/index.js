const express = require('express');

const authRoute = require('./auth.routes');
const refreshRoute = require('./refres.routes')

function routes() {
    const router = express.Router();

    router.use('/auth', authRoute());
    router.use('/refresh',refreshRoute())

    return router;
}

module.exports = routes;
