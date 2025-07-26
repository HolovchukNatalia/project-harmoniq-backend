import { getUserArticlesServise } from '../services/getUserArticlesServise.js';
import { userInfoService } from '../services/userInfoService.js';

export const userInfoController = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await userInfoService(userId);
    const userArticles = await getUserArticlesServise(userId);
    res.status(200).json({
      status: 200,
      message: `User with ${userId} successfull found`,
      user,
      userArticles,
    });
  } catch (error) {
    next(error);
  }
};
