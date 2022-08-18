const Joi = require('joi');
// import { join } from 'path/posix';

const fundValidation = {
  params: Joi.object().keys({
    user_id: Joi.string().uuid().required(),
  }),
  body: Joi.object().keys({
    amount: Joi.number().required(),
    account_number: Joi.string().required(),
  }),
};

const accountValidation = {
  params: Joi.object().keys({
    user_id: Joi.string().uuid().required(),
  }),
  body: Joi.object().keys({
    amount: Joi.number().optional(),
  }),
};

const transferValidation = {
  params: Joi.object().keys({
    user_id: Joi.string().uuid().required(),
  }),
  body: Joi.object().keys({
    account_number: Joi.string().required(),
    receipient: Joi.string().uuid().required(),
    account_to: Joi.string().required(),
    amount: Joi.number().required(),
  }),
};

const withdrawalValidation = {
  params: Joi.object().keys({
    user_id: Joi.string().uuid().required(),
  }),
  body: Joi.object().keys({
    amount: Joi.number().required(),
    account_number: Joi.string().required(),
  }),
};

const createuserValidation = {
  body: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
  }),
};

module.exports = {
  withdrawalValidation,
  transferValidation,
  fundValidation,
  accountValidation,
  createuserValidation,
};
