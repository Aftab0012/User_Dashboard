const Joi = require('joi');

const userValSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

module.exports = userValSchema;
