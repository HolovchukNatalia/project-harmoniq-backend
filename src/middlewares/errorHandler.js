import { HttpError } from 'http-errors';
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  const status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
  const isOperational = err.isOperational ?? false;

  const message = isOperational
    ? err.message
    : 'Something went wrong. Please try again later.';

  res.status(statusCode).json({
    status,
    message,
    stack: err.stack,
    data: {},
  });
};

export default errorHandler;
