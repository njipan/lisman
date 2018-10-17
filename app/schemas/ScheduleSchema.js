const Joi = require("joi");

const schema = Joi.object().keys({
  subject_id: Joi.required(),
  audio_id: Joi.required(),
  description: Joi.string().required(),
  class: Joi.string().required(),
  time_start: Joi.date().required(),
  time_end: Joi.date().required(),
  status: Joi.string().required()
});

module.exports = schema;
