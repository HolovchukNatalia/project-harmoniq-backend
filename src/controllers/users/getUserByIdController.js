import { getArticlesByIdsService } from '../../services/articles/getArticlesByIdsService.js';
import { getUserArticlesServise } from '../../services/users/getUserArticlesServise.js';
import { getUserByIdService } from '../../services/users/getUserByIdService.js';
import { cleanUser } from '../../utils/cleanUser.js';

export const getUserByIdController = async (req, res, next) => {
  const { userId } = req.params;

  const user = await getUserByIdService(userId);
  const userArticles = await getUserArticlesServise(userId);
  const savedArticles = await getArticlesByIdsService(user.saved);

  const cleanedUser = cleanUser(user);

  res.status(200).json({
    status: 200,
    message: `User with ${userId} successfully found`,
    user: cleanedUser,
    userArticles,
    savedArticles,
  });
};
