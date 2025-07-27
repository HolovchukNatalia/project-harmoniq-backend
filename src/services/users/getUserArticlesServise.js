import Article from '../../db/models/article.js';

export const getUserArticlesServise = async (id) => {
  return await Article.find({ ownerId: id });
};
