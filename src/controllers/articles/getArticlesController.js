import createHttpError from 'http-errors';
import { getAllArticles } from '../../services/articles/articlesCRUD.js';
import { parsePaginationParams } from '../../utils/parsePaginationParams.js';

const allowedSortMethods = ['all', 'popular'];

export const getArticlesController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { filter: sortMethod } = req.query;

  if (sortMethod && !allowedSortMethods.includes(sortMethod)) {
    throw createHttpError(400, 'Invalid filter parameter');
  }

  const articles = await getAllArticles({
    page,
    perPage,
    sortMethod,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully retrieved articles',
    data: { ...articles },
  });
};
