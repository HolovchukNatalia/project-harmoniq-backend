import Article from '../../db/models/article.js';

export const getPopularArticlesService = async (limit = 5) => {
  return await Article.find().sort({ rate: -1 }).limit(limit);
};
