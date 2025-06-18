const Joi = require("joi");
const { Types } = require("mongoose");

// schema لتسجيل المستخدم
const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
    "string.empty": "Name cannot be empty",
  }),
    userName: Joi.string().required().messages({
    "any.required": "Username is required",
    "string.empty": "Username cannot be empty",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Invalid email format",
  }),
  password: Joi.string().min(5).required().messages({
    "any.required": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),
});


// here loginschemaa 
const loginSchema = Joi.object({
     userName: Joi.string().required().messages({
    "any.required": "Username is required",
    "string.empty": "Username cannot be empty",
  }),
    password: Joi.string().required().messages({
      "any.required": "Password is required",
      "string.empty": "Password cannot be empty",
    }),
  });
  

  //edit admin
  const editAdminSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
    "string.empty": "Name cannot be empty",
  }),
    userName: Joi.string().required().messages({
    "any.required": "Username is required",
    "string.empty": "Username cannot be empty",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Invalid email format",
  }),
  password: Joi.string().min(5).messages({
    "any.required": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),
  type: Joi.string(),
});
module.exports = {
  registerSchema,
  loginSchema ,
  editAdminSchema 
};
