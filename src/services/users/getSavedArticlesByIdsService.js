import Article from '../../db/models/article.js';

export const getSavedArticlesByIdsService = async (idsArray) => {
  if (!Array.isArray(idsArray) || idsArray.length === 0) {
    return [];
  }
  return await Article.find({ _id: { $in: idsArray } });
};
