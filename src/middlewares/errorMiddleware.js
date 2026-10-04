const errorHandler = (err, req, res, next) => {
  console.error(err);

  const status = err.statusCode || 500;
  const message = err.message || "Server error";

  // Don't expose error details in production
  const response = {
    message: process.env.NODE_ENV === "production" && status === 500 
      ? "Internal server error" 
      : message,
  };

  // Include stack trace in development
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  res.status(status).json(response);
};

module.exports = errorHandler;
