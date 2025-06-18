const Joi = require("joi");

const createProductSchema = Joi.object({
  name: Joi.string().min(2).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().positive().required(),
  image: Joi.string().optional(),
  category: Joi.string().required().messages({
    "any.required": "Category is required",
    "string.empty": "Category cannot be empty",
  }),
});
const updateProductSchema = Joi.object({
  name: Joi.string().min(2),
  description: Joi.string().min(10),
  price: Joi.number().positive(),
  image: Joi.string(),
  category: Joi.string().optional(),
});

module.exports = {
  createProductSchema,
  updateProductSchema
};
