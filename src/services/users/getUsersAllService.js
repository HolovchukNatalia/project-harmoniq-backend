import User from '../../db/models/user.js';
import { calculatePaginationData } from '../../utils/calculatePaginationData.js';

export const getUsersAllService = async ({
  filter = 'all',
  limit = null,
  page = 1,
  perPage = 10,
}) => {
  const totalCount = await User.countDocuments();

  const maxCount = limit ? Math.min(totalCount, limit) : totalCount;

  const maxPages = Math.ceil(maxCount / perPage);

  const safePage = page > maxPages && maxPages > 0 ? 1 : page;

  const skip = (safePage - 1) * perPage;

  const limitForPage = Math.min(perPage, maxCount - skip);

  if (skip >= maxCount) {
    return {
      users: [],
      paginationData: calculatePaginationData(maxCount, perPage, safePage),
    };
  }

  let query = User.find();

  if (filter === 'popular') {
    query = query.sort({ articlesAmount: -1 });
  }

  query = query
    .skip(skip)
    .limit(limitForPage)
    .select('-password -email')
    .lean();

  const users = await query.exec();

  const paginationData = calculatePaginationData(maxCount, perPage, safePage);

  return { users, paginationData };
};
