const globalErrorHandler = (err, req, res, next) => {
  const isOperational = err.isOperational || false;

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Sequelize / MySQL errors
  if (err.name === "SequelizeUniqueConstraintError") {
    statusCode = 400;
    const field = err.errors[0].path;
    message = `Duplicate field value: ${field}. Please use another value!`;
  } else if (err.name === "SequelizeValidationError") {
    statusCode = 400;
    message = err.errors.map((e) => e.message).join(", ");
  } else if (err.name === "SequelizeForeignKeyConstraintError") {
    statusCode = 400;
    message = `Invalid reference: ${err.index}`;
  }
  // JWT errors
  else if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token. Please log in again.";
  } else if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Your token has expired. Please log in again.";
  }
  // Redis session errors
  else if (err.name === "SessionNotFoundError") {
    statusCode = 401;
    message = "Session expired. Please log in again.";
  }

  if (!isOperational) {
    console.error(err);
    statusCode = 500;
    message = "Something went wrong. Please try again later.";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = globalErrorHandler;
