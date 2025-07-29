import { getUsersAllService } from '../../services/users/getUsersAllService.js';

export const getUsersAllController = async (req, res, next) => {
  const { page = 1, perPage = 10 } = req.query;
  const pageNum = parseInt(page);
  const perPageNum = parseInt(perPage);

  const { users, paginationData } = await getUsersAllService({
    page: pageNum,
    perPage: perPageNum,
  });

  res.status(200).json({
    status: 200,
    message: 'Users retrieved successfully',
    users,
    paginationData,
  });
};
