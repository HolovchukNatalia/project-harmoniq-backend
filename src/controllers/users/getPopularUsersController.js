import { getPopularUsers } from '../../services/users/getPopularUsers.js';

export const getPopularUsersController = async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 5;
  const users = await getPopularUsers(limit);

  res.status(200).json({
    status: 200,
    message: `Top ${limit} users sorted by articlesAmount`,
    data: { users },
  });
};
