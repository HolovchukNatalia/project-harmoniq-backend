import createHttpError from 'http-errors';
import { deleteArticle } from '../../services/articles/articlesCRUD.js';

export const deleteArticleController = async (req, res) => {
  const { articleId } = req.params;

  if (!articleId) {
    throw createHttpError(400, 'Article ID is required');
  }

  const article = await deleteArticle(articleId);

  if (!article) {
    throw createHttpError(404, `Article with id ${articleId} not found!`);
  }

  res.status(204).send();
};
