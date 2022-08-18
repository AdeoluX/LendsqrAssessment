const Joi = require('joi');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const validateReq = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = check(validSchema, object);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

const check = (schema, data) => {
  const object = pick(data, Object.keys(schema));
  return Joi.compile(schema)
    .prefs({ errors: { label: 'key' } })
    .validate(object);
};

const validate = (schema, data) => {
  const { value, error } = check(schema, data);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(', ');
    throw new ApiError(httpStatus.BAD_REQUEST, errorMessage);
  }

  return value;
};

module.exports = { validateReq, validate };
