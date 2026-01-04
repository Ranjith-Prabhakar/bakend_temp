require("dotenv").config();

module.exports = {
  development: {
    username: process.env.MY_SQL_USERNAME,
    password: process.env.MY_SQL_PASSWORD,
    database: process.env.MY_SQL_DATABASE_NAME,
    host: process.env.MY_SQL_HOST || "127.0.0.1",
    dialect: "mysql",
  },

  test: {
    username: process.env.MY_SQL_USERNAME,
    password: process.env.MY_SQL_PASSWORD,
    database: process.env.MY_SQL_DATABASE_NAME,
    host: process.env.MY_SQL_HOST || "127.0.0.1",
    dialect: "mysql",
  },

  production: {
    username: process.env.MY_SQL_USERNAME,
    password: process.env.MY_SQL_PASSWORD,
    database: process.env.MY_SQL_DATABASE_NAME,
    host: process.env.MY_SQL_HOST,
    dialect: "mysql",
    logging: false,
  },
};
