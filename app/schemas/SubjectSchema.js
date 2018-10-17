const Joi = require("joi");

const schema = Joi.object().keys({
  subject_name: Joi.string().required()
});

module.exports = schema;
