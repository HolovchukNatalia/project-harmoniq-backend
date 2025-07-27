import User from '../db/models/user.js';

export const allUsersInfoService = async () => {
  return await User.find().select('-password').select('-email');
};
