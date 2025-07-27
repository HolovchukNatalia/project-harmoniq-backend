import { allUsersInfoService } from '../services/users/allUsersInfoService.js';
import { getUserArticlesServise } from '../services/users/getUserArticlesServise.js';
import { saveArticleToUserServise } from '../services/users/saveArticleToUserServise.js';
import { userInfoService } from '../services/users/userInfoService.js';

export const userInfoController = async (req, res, next) => {
  const { userId } = req.params;

  const user = await userInfoService(userId);
  const userArticles = await getUserArticlesServise(userId);
  res.status(200).json({
    status: 200,
    message: `User with ${userId} successfull found`,
    user,
    userArticles,
  });
};

export const saveArticleToUserController = async (req, res, next) => {
  const { userId, articleId } = req.params;

  await saveArticleToUserServise(userId, articleId);
  res.status(201).json({
    status: 201,
    message: 'Article successfully saved',
  });
};

export const allUsersInfoController = async (req, res, next) => {
  const users = await allUsersInfoService();
  res.status(200).json({
    status: 200,
    message: 'Users retrieved successfully',
    users,
  });
};
