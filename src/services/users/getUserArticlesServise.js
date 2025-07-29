import Article from '../../db/models/article.js';

export const getUserArticlesServise = async (id) => {
  if (!id) {
    throw new Error('User ID is required');
  }
  return await Article.find({ ownerId: id });
};
