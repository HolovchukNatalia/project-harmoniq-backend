import { deleteArticleFromUserService } from '../../services/users/deleteArticleFromUserService.js';

export const deleteArticleFromUserController = async (req, res, next) => {
  const { userId, articleId } = req.params;

  if (req.user._id.toString() !== userId) {
    return res.status(403).json({
      status: 403,
      message: 'You are not allowed to delete article from another user',
    });
  }

  await deleteArticleFromUserService(userId, articleId);

  res.status(200).json({
    status: 200,
    message: 'Article successfully removed from saved',
  });
};
