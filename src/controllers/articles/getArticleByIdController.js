import createHttpError from 'http-errors';
import { getArticleById } from '../../services/articles/articlesCRUD.js';

export const getArticleByIdController = async (req, res, next) => {
  const { articleId } = req.params;

  if (!articleId) {
    throw createHttpError(400, 'Article ID is required');
  }

  const article = await getArticleById(articleId);

  if (!article) {
    throw createHttpError(404, `Article with id ${articleId} not found!`);
  }

  res.json({
    status: 200,
    message: `Successfully found article with id ${articleId}!`,
    data: { article },
  });
};
