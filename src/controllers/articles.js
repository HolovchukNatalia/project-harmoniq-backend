import createHttpError from 'http-errors';
import { getAllArticles, getArticleById } from '../services/articles.js';
import { createArticle } from '../services/articles.js';
import { deleteArticle } from '../services/articles.js';
import User from '../db/models/user.js';
export const getArticlesController = async (req, res, next) => {
  try {
    const articles = await getAllArticles();
    res.status(200).json({
      data: articles,
    });
  } catch (err) {
    next(err);
  }
};

export const getArticleByIdController = async (req, res, next) => {
  const { articleId } = req.params;
  const article = await getArticleById(articleId);
  if (!article) {
    throw createHttpError(404, 'Student not found');
  }
  res.json({
    status: 200,
    message: `Successfully found student with id ${articleId}!`,
    data: article,
  });
};
export const createArticleController = async (req, res) => {
  const article = await createArticle(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfuly created a article!',
    data: article,
  });
};
export const deleteArticleController = async (req, res, next) => {
  const { articleId } = req.params;
  const article = await deleteArticle(articleId);
  if (!article) {
    next(createHttpError(404, 'Student not found'));
    return;
  }
  res.status(204).send();
};

export const saveArticleToUser = async (req, res, next) => {
  const { userId, articleId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    if (!user.saved.includes(articleId)) {
      user.saved.push(articleId);
      await user.save();
    }

    res.status(200).json({ message: 'Article successfully saved' });
  } catch (err) {
    next(err);
  }
};

export const getSavedArticles = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('saved');
    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    res.status(200).json({ data: user.saved });
  } catch (err) {
    next(err);
  }
};
