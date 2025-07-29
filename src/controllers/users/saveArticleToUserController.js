import { saveArticleToUserServise } from '../../services/users/saveArticleToUserServise.js';

export const saveArticleToUserController = async (req, res, next) => {
  const { userId, articleId } = req.params;

  if (req.user._id.toString() !== userId) {
    return res.status(403).json({
      status: 403,
      message: 'You are not allowed to save article to another user',
    });
  }

  await saveArticleToUserServise(userId, articleId);

  res.status(201).json({
    status: 201,
    message: 'Article successfully saved',
  });
};
