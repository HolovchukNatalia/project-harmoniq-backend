import { getSavedArticlesByIdsService } from '../services/users/getSavedArticlesByIdsService.js';
import { getUserArticlesServise } from '../services/users/getUserArticlesServise.js';

export const getUserContent = async (userId, savedIds) => {
  const userArticles = await getUserArticlesServise(userId);
  const savedArticles = await getSavedArticlesByIdsService(savedIds);
  return { userArticles, savedArticles };
};
