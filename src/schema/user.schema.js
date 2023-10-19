const Joi = require("joi");

const userSchema = Joi.object({
  id: Joi.number(),
  email: Joi.string().email().required(),
  gender: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
});

module.exports = userSchema;
