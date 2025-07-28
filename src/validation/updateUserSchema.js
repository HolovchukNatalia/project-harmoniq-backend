import Joi from 'joi';
export const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(32).trim().optional(),
  saved: Joi.array().items(Joi.string().hex().length(24)).optional(),
  avatarUrl: Joi.string().uri().allow('', null).optional(),
  articlesAmount: Joi.number().integer().min(0).optional(),
});
