const Joi = require("joi");

const schema = Joi.object().keys({
  category_name: Joi.string().required()
});

module.exports = schema;
