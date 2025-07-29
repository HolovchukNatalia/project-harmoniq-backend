import User from '../../db/models/user.js';
import { calculatePaginationData } from '../../utils/calculatePaginationData.js';

export const getUsersAllService = async ({ page = 1, perPage = 10 }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const usersQuery = User.find().select('-password').select('-email');

  const totalCount = await User.countDocuments();

  const users = await usersQuery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(totalCount, perPage, page);

  return { users, paginationData };
};
