const mongoose = require('mongoose');
const { connection } = require('mongoose');
const { connectionLogger } = require('../config/logger');
const { MONGO_URI } = require('../config/env');

const MAX_RESTARTS = 5;
const RESTART_INTERVAL_MS = 30000;
let restartAttempts = 0;
let isHealthy = false;
let retryTimeout = null;


function setupConnectionListeners() {
  const db = connection;

  db.on('connected', () => {
    connectionLogger.info('✅ MongoDB connected');
    restartAttempts = 0;
    isHealthy = true;
    if (retryTimeout) clearTimeout(retryTimeout); // stop pending retries
  });

  db.on('error', (err) => {
    connectionLogger.error('❌ MongoDB connection error', { error: err });
    isHealthy = false;

    if (restartAttempts < MAX_RESTARTS) {
      connectWithRetry();
    } else {
      connectionLogger.error('🚨 Max retries reached from error event. Exiting.');
      process.exit(1);
    }
  });

  db.on('disconnected', () => {
    connectionLogger.error('⚠️ MongoDB disconnected');
    isHealthy = false;

    if (restartAttempts < MAX_RESTARTS) {
      connectWithRetry();
    } else {
      connectionLogger.error('🚨 Max retries reached from disconnect. Exiting.');
      process.exit(1);
    }
  });
}

 function connectWithRetry() {
  if (restartAttempts >= MAX_RESTARTS) {
    connectionLogger.error('🚨 Max MongoDB reconnect attempts reached. Exiting process.');
    process.exit(1);
  }

  restartAttempts += 1;
  connectionLogger.warn(`Attempting MongoDB reconnect #${restartAttempts} in ${RESTART_INTERVAL_MS / 1000}s`);

  retryTimeout = setTimeout(async() => {
    connectionLogger.info('🔄 Trying to reconnect to MongoDB...');
    try {
      await mongoose.connect(MONGO_URI);
    } catch (error) {
      connectWithRetry()
    }
  }, RESTART_INTERVAL_MS);
}


const getMongoHealthStatus = () => isHealthy;

module.exports = {
  setupConnectionListeners,
  getMongoHealthStatus,
};
