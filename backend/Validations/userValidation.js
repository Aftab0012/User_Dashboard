const Joi = require('joi');

const userValSchema = Joi.object().keys({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().required(),
  department: Joi.string().required(),
});

module.exports = userValSchema;
