import { getUsersAllService } from '../../services/users/getUsersAllService.js';

export const getUsersAllController = async (req, res) => {
  const { page = 1, perPage = 20 } = req.query;
  const pageNum = parseInt(page);
  const perPageNum = parseInt(perPage);

  const { users, paginationData } = await getUsersAllService({
    page: pageNum,
    perPage: perPageNum,
  });

  res.status(200).json({
    status: 200,
    message: 'Users retrieved successfully',
    data: {
      users,
      paginationData,
    },
  });
};
