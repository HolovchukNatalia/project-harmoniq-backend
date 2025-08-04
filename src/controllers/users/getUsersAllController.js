import { getUsersAllService } from '../../services/users/getUsersAllService.js';

const allowedFilters = ['all', 'popular'];

export const getUsersAllController = async (req, res) => {
  const { filter = 'all' } = req.query;
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const limit = req.query.limit ? parseInt(req.query.limit) : null;

  if (!allowedFilters.includes(filter)) {
    return res
      .status(400)
      .json({ status: 400, message: 'Invalid filter parameter' });
  }

  const { users, paginationData } = await getUsersAllService({
    filter,
    limit,
    page,
    perPage,
  });

  res.status(200).json({
    status: 200,
    message: `Users retrieved successfully with filter: ${filter}`,
    data: { users, paginationData },
  });
};
