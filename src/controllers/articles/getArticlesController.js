import createHttpError from 'http-errors';
import { parsePaginationParams } from '../../utils/parsePaginationParams.js';
import { getAllArticles } from '../../services/articles/getAllArticles.js';

const allowedFilters = ['all', 'popular'];

export const getArticlesController = async (req, res) => {
  const { filter = 'all' } = req.query;
  const { page: rawPage, perPage } = parsePaginationParams(req.query);
  const userLimit = req.query.limit ? Number(req.query.limit) : null;

  if (!allowedFilters.includes(filter)) {
    throw createHttpError(400, 'Invalid filter parameter');
  }

  const { articles, paginationData } = await getAllArticles({
    page: rawPage,
    perPage,
    filter,
    limit: userLimit,
  });

  res.status(200).json({
    status: 200,
    message: `Successfully retrieved ${filter} articles`,
    data: {
      articles,
      pagination: paginationData,
    },
  });
};
