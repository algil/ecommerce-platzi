const Joi = require('joi');
const Boom = require('boom');

function validate(data, schema) {
  const { error } = Joi.validate(data, schema);
  return error;
}

function validationHandler(schema, check = 'body') {
  return (req, res, next) => {
    const error = validate(req[check], schema);
    error ? next(Boom.badRequest(error)) : next();
  };
}

module.exports = validationHandler;
