const Joi = require("joi");

const schema = Joi.object().keys({
  categories: Joi.array().items(Joi.number()),
  audio_name: Joi.string().required()
});

module.exports = schema;
