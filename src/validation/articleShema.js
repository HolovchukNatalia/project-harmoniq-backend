import Joi from 'joi';
import mongoose from 'mongoose';

export const articleSchema = Joi.object({
  image: Joi.string().uri().required().messages({
    'any.required': 'Image is required',
    'string.uri': 'Invalid image format (must be a valid URL)',
  }),

  title: Joi.string().min(5).max(100).required().messages({
    'any.required': 'Title is required',
    'string.min': 'Title must be at least 5 characters long',
    'string.max': 'Title must not exceed 120 characters',
  }),

  desc: Joi.string().min(5).required().max(100),

  article: Joi.string().min(100).required().messages({
    'any.required': 'Text is required',
    'string.min': 'Text must be at least 100 characters long',
  }),

  rate: Joi.number().default(0),

  ownerId: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    })
    .required()
    .messages({
      'any.invalid': 'Invalid owner ID',
      'any.required': 'ownerId is required',
    }),

  date: Joi.date().iso().required().messages({
    'any.required': 'Date is required',
    'date.format': 'Invalid date format (must be ISO)',
  }),
});
