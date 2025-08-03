import { getPopularArticlesService } from '../../services/articles/getPopularArticlesService.js';

export const getPopularArticlesController = async (req, res, next) => {
  let limit = parseInt(req.query.limit, 10);

  if (isNaN(limit) || limit <= 0) {
    limit = 5;
  }

  const articles = await getPopularArticlesService(limit);

  res.status(200).json({
    status: 200,
    message: `Top ${limit} popular articles`,
    data: { articles },
  });
};
