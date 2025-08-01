import Article from '../../db/models/article.js';

export const getSavedArticlesByIdsService = async (idsArray) => {
  if (!Array.isArray(idsArray) || idsArray.length === 0) {
    return [];
  }
  const articles = await Article.find({ _id: { $in: idsArray } })
    .populate('ownerId', 'name')
    .lean();

  return articles.map((article) => ({
    ...article,
    author: article.ownerId?.name || null,
    ownerId: article.ownerId?._id || article.ownerId,
  }));
};
