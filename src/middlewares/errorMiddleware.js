const errorHandler = (err, req, res, next) => {
  console.error(err);

  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || "Server error",
  });
};

module.exports = errorHandler;
