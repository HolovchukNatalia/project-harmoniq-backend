import Joi from 'joi';

export const loginUserSchema = Joi.object({
  email: Joi.string().email().max(64).required().messages({
    'string.base': 'Email must be a string',
    'string.empty': 'Email is required',
    'string.email': 'Email must be a valid email address',
    'string.max': 'Email must not exceed 64 characters',
    'any.required': 'Email is required',
  }),

  password: Joi.string().min(8).max(64).required().messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 8 characters long',
    'string.max': 'Password must not exceed 64 characters',
    'any.required': 'Password is required',
  }),
});
