import { getPopularArticlesService } from '../../services/articles/getPopularArticlesService.js';

export const getPopularArticlesController = async (req, res, next) => {
  const limit = parseInt(req.query.limit, 10) || 5;
  const articles = await getPopularArticlesService(limit);

  res.status(200).json({
    status: 200,
    message: `Top ${limit} popular articles`,
    data: { articles },
  });
};
