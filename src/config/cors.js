const {allowedOrigins } = require('./app')
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'PATCH', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'x-refresh-token', 'x-user-role', 'x-verify-token'],
  optionsSuccessStatus: 204,
  preflightContinue: false,
};


module.exports = corsOptions