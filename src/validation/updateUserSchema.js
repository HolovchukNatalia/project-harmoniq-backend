import Joi from 'joi';
export const updateUserSchema = Joi.object({
  newName: Joi.string().min(2).max(32).trim().optional(),
  oldPassword: Joi.string().min(6).max(128).optional(),
  newPassword: Joi.string().min(6).max(128).optional(),
});
