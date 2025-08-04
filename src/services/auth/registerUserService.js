import User from '../../db/models/user.js';
import createHttpError from 'http-errors';

export const registerUserService = async ({ name, email, password }) => {
  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw createHttpError(409, 'User with this email already exists');
  }

  const newUser = await User.create({ name, email, password });

  return newUser;
};
