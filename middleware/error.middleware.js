const Boom = require('boom');
const Sentry = require('@sentry/node');
const { config } = require('../config');
const isRequestAjaxOrApi = require('../utils/is-request-ajax-or-api');

Sentry.init({
  dsn: `https://${config.sentryDns}@sentry.io/${config.sentryId}`
});

function withErrorStack(error, stack) {
  if (config.dev) {
    return { ...error, stack };
  }
  return error;
}

function logErrors(error, req, res, next) {
  // Sentry.captureException(error);
  console.error(error.stack);
  next(error);
}

function wrapErrors(error, req, res, next) {
  if (!error.isBoom) {
    next(Boom.badImplementation(error));
  }
  next(error);
}

function clientErrorHandler(error, req, res, next) {
  const {
    output: { statusCode, payload }
  } = error;
  if (isRequestAjaxOrApi(req) || res.headersSent) {
    res.status(statusCode).json(withErrorStack(payload, error.stack));
  } else {
    next(error);
  }
}

function errorHandler(error, req, res, next) {
  const {
    output: { statusCode, payload }
  } = error;

  res.status(statusCode);
  res.render('error', withErrorStack(payload, error.stack));
}

module.exports = {
  logErrors,
  wrapErrors,
  clientErrorHandler,
  errorHandler
};
