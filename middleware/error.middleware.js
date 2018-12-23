const { config } = require('../config');

function logErrors(error, req, res, next) {
  console.log(error.stack);
  next(error);
}

function clientErrorHandler(error, req, res, next) {
  if (req.xhr) {
    // catch for clients with header('x-requested-with', 'XMLHttpRequest')
    res.status(500).send({ error: error.message });
  } else {
    next(error);
  }
}

function errorHandler(error, req, res, next) {
  // catch errors while streaming
  if (res.headersSent) {
    next(error);
  }

  if (!config.dev) {
    delete error.stack;
  }

  res.status(error.status || 500);
  res.render('error', { error });
}

module.exports = {
  logErrors,
  clientErrorHandler,
  errorHandler
};
