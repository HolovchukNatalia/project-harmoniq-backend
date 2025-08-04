import Article from '../../db/models/article.js';
import User from '../../db/models/user.js';

export const getArticleById = async (articleId) => {
  const article = await Article.findOne({ _id: articleId })
    .populate('ownerId', 'name')
    .lean();

  return {
    ...article,
    author: article?.ownerId?.name || null,
    ownerId: article?.ownerId?._id || article.ownerId,
  };
};

export const createArticle = async (payload) => {
  const article = await Article.create(payload);
  const { ownerId } = payload;
  const user = await User.findById(ownerId);
  if (user) {
    user.articlesAmount = (user.articlesAmount || 0) + 1;
    await user.save({ validateBeforeSave: false });
  }
  return article;
};
