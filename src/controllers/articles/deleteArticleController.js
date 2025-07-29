import createHttpError from 'http-errors';
import { deleteArticle } from '../../services/articles/articlesCRUD.js';

export const deleteArticleController = async (req, res, next) => {
  const { articleId } = req.params;
  const article = await deleteArticle(articleId);
  if (!article) {
    next(createHttpError(404, `Article with id ${articleId} not found!`));
    return;
  }
  res.status(204).send();
};
