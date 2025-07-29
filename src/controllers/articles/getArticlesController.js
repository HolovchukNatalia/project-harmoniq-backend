import { getAllArticles } from '../../services/articles/articlesCRUD.js';
import { parsePaginationParams } from '../../utils/parsePaginationParams.js';

export const getArticlesController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { filter: sortMethod } = req.query;
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
