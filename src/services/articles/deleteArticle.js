import mongoose from 'mongoose';
import Article from '../../db/models/article.js';
import User from '../../db/models/user.js';

export const deleteArticle = async (articleId) => {
  if (!mongoose.Types.ObjectId.isValid(articleId)) {
    return null;
  }
  const article = await Article.findByIdAndDelete(articleId);
  const { ownerId } = article;
  const user = await User.findById(ownerId);
  if (user) {
    user.articlesAmount = Math.max((user.articlesAmount || 1) - 1, 0);
    await user.save({ validateBeforeSave: false });
  }
  return article;
};
