import User from '../../db/models/user.js';

export const getPopularUsers = async (limit = 5) => {
  return await User.find()
    .sort({ articlesAmount: -1 })
    .limit(limit)
    .select('-password -email -saved');
};
