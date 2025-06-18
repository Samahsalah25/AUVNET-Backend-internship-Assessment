// validators/categoryValidator.js
const Joi = require("joi");
const mongoose = require("mongoose");

const categorySchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Category name is required",
    "string.empty": "Category name cannot be empty",
  }),
   parent: Joi.string().allow(null, "").optional(),
});

module.exports = {categorySchema};
