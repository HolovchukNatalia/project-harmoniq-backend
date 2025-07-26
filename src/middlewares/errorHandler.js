export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  const status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
  const isDev = process.env.NODE_ENV === 'development';
  const isOperational = err.isOperational ?? false;

  const message = isOperational
    ? err.message
    : 'Something went wrong. Please try again later.';

  console.error(`🔴 Error [${statusCode}]:`, err.message);
  if (isDev) {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    status,
    message,
    ...(isDev && { stack: err.stack }),
    data: {},
  });
};

export default errorHandler;
