import Article from '../../db/models/Article.js';

export const getUserArticlesServise = async (id) => {
  return await Article.find({ ownerId: id });
};
