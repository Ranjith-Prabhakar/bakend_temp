require('dotenv').config();

const environmentVariables = {
  SMTP_HOST:null,
  SMTP_USER:null,
  SMTP_PASS:null,
  PORT:null,
  NODE_ENV:null,
  MONGO_URI:null,
  JWT_ACCESS_SECRET:null,
  JWT_REFRESH_SECRET:null,
  DB_NAME:null,
};


Object.keys(environmentVariables).forEach((key) => {
  if (!process.env[key]) {
    const msg = `Missing required environment variable: ${key}`;
    throw new Error(msg)
  }else{
    environmentVariables[key] = process.env[key]
  }
});

module.exports = environmentVariables
