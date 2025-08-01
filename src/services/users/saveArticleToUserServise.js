import Article from '../../db/models/article.js';
import User from '../../db/models/user.js';
import createHttpError from 'http-errors';

export const saveArticleToUserServise = async (userId, articleId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const article = await Article.findById(articleId);
  if (!article) {
    throw createHttpError(404, 'Article not found');
  }

  if (!Array.isArray(user.saved)) {
    user.saved = [];
  }

  if (user.saved.includes(articleId)) {
    throw createHttpError(409, 'Article already saved');
  }

  user.saved.push(articleId);
  await user.save({ validateBeforeSave: false });

  article.rate = (article.rate || 0) + 1;
  await article.save({ validateBeforeSave: false });
};
