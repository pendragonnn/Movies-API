const Joi = require("joi");

const movieSchema = Joi.object({
  id: Joi.required(),
  title: Joi.string().required(),
  genres: Joi.string().required(),
  year: Joi.string().required(),
});

module.exports = movieSchema;
