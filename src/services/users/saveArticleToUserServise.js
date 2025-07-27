import User from '../../db/models/User.js';
import createHttpError from 'http-errors';

export const saveArticleToUserServise = async (userId, articleId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  if (!Array.isArray(user.saved)) {
    user.saved = [];
  }

  if (!user.saved.includes(articleId)) {
    user.saved.push(articleId);
    await user.save({ validateBeforeSave: false });
  }
};
