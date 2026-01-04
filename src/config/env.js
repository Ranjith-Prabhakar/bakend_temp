require("dotenv").config();

const environmentVariables = {
  MY_SQL_USERNAME: null,
  MY_SQL_PASSWORD: null,
  MY_SQL_DATABASE_NAME: null,
  MY_SQL_HOST: null,
  UPSTASH_REDIS_URL: null,
  PORT: null,
  NODE_ENV: null,
  JWT_ACCESS_SECRET: null,
  JWT_REFRESH_SECRET: null,
};

Object.keys(environmentVariables).forEach((key) => {
  if (!process.env[key]) {
    const msg = `Missing required environment variable: ${key}`;
    throw new Error(msg);
  } else {
    environmentVariables[key] = process.env[key];
  }
});

module.exports = environmentVariables;
