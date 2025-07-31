import User from '../../db/models/user.js';
import Article from '../../db/models/article.js';
import createHttpError from 'http-errors';

export const deleteArticleFromUserService = async (userId, articleId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  if (!Array.isArray(user.saved)) {
    user.saved = [];
  }

  const index = user.saved.indexOf(articleId);
  if (index !== -1) {
    user.saved.splice(index, 1);
    await user.save({ validateBeforeSave: false });

    const article = await Article.findById(articleId);
    if (article && article.rate && article.rate > 0) {
      article.rate -= 1;
      await article.save({ validateBeforeSave: false });
    }
  }
};
