const ApiError = require("../utils/apiError");

const sendErrorToDev = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });

const sendErrorToProd = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });

const handleJwtInvalidSignature = (req) =>
  new ApiError(req.t("auth:invalid_token"), 401);

const handleJwtExpired = (req) =>
  new ApiError(req.t("auth:expired_token"), 401);

const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorToDev(err, res);
  } else {
    if (err.name === "JsonWebTokenError") err = handleJwtInvalidSignature(req);
    if (err.name === "TokenExpiredError") err = handleJwtExpired(req);
    sendErrorToProd(err, res);
  }
};

module.exports = globalError;
