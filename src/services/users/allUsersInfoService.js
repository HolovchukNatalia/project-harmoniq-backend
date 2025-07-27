import User from '../../db/models/User.js';

export const allUsersInfoService = async () => {
  return await User.find().select('-password').select('-email');
};
