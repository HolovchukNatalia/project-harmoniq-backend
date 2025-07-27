import createHttpError from 'http-errors';
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticleById,
} from '../services/articles/articlesCRUD.js';

export const getArticlesController = async (req, res, next) => {
  const articles = await getAllArticles();
  res.status(200).json({
    status: 200,
    message: 'Successfully retrieved articles',
    articles,
  });
};

export const getArticleByIdController = async (req, res, next) => {
  const { articleId } = req.params;
  const article = await getArticleById(articleId);
  if (!article) {
    throw createHttpError(404, `Article with id ${articleId} not found!`);
  }
  res.json({
    status: 200,
    message: `Successfully found article with id ${articleId}!`,
    article,
  });
};

export const createArticleController = async (req, res) => {
  const article = await createArticle(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created an article!',
    data: article,
  });
};

export const deleteArticleController = async (req, res, next) => {
  const { articleId } = req.params;
  const article = await deleteArticle(articleId);
  if (!article) {
    next(createHttpError(404, `Article with id ${articleId} not found!`));
    return;
  }
  res.status(204).send();
};
