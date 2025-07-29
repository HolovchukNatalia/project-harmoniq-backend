import Article from '../../db/models/article.js';

export const getArticlesByIdsService = async (idsArray) => {
  const articles = await Article.find({ _id: { $in: idsArray } });
  return articles;
};
