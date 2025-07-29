import createHttpError from 'http-errors';
import User from '../../db/models/user.js';
import mongoose from 'mongoose';

export const getUserByIdService = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createHttpError(400, 'Invalid user ID');
  }
  const user = await User.findById(id).select('-password').select('-email');
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  return user;
};
