import Article from '../../db/models/article.js';

export const getUserArticlesServise = async (id) => {
  if (!id) {
    throw new Error('User ID is required');
  }
  const articles = await Article.find({ ownerId: id })
    .populate('ownerId', 'name')
    .lean();

  return articles.map((article) => ({
    ...article,
    author: article.ownerId?.name || null,
    ownerId: article.ownerId?._id || article.ownerId,
  }));
};
