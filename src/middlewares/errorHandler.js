export const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err.status) {
    statusCode = err.status;
    message = err.message;
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
  } else if (err.name === 'MongoError' && err.code === 11000) {
    statusCode = 409;
    message = 'Duplicate key error';
  } else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  } else if (err.message) {
    message = err.message;
  }

  const response = {
    status: statusCode,
    message,
    stack: err.stack,
  };

  res.status(statusCode).json(response);
};
