import { allUsersInfoService } from '../services/users/allUsersInfoService.js';
import { getUserArticlesServise } from '../services/users/getUserArticlesServise.js';
import { saveArticleToUserServise } from '../services/users/saveArticleToUserServise.js';
import { userInfoService } from '../services/users/userInfoService.js';
import User from '../db/models/user.js';
import createHttpError from 'http-errors';
import { uploadUserAvatar } from '../services/users/uploadUserAvatar.js';

export const userInfoController = async (req, res, next) => {
  const { userId } = req.params;

  const user = await userInfoService(userId);
  const userArticles = await getUserArticlesServise(userId);
  res.status(200).json({
    status: 200,
    message: `User with ${userId} successfully found`,
    user,
    userArticles,
  });
};

export const saveArticleToUserController = async (req, res, next) => {
  const { userId, articleId } = req.params;

  if (req.user._id.toString() !== userId) {
    return res.status(403).json({
      status: 403,
      message: 'You are not allowed to save article to another user',
    });
  }

  await saveArticleToUserServise(userId, articleId);
  res.status(201).json({
    status: 201,
    message: 'Article successfully saved',
  });
};

export const allUsersInfoController = async (req, res, next) => {
  const { page = 1, perPage = 10 } = req.query;
  const pageNum = parseInt(page);
  const perPageNum = parseInt(perPage);

  const { users, paginationData } = await allUsersInfoService({
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

export const patchUserController = async (req, res, next) => {
  const { userId } = req.params;
  const image = await uploadUserAvatar(req.file);

  const updateData = {
    ...req.body,
  };
  if (image) {
    updateData.avatarUrl = image;
  }

  const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  })
    .select('-password')
    .select('-email');

  if (!updatedUser) {
    return next(createHttpError(404, 'User not found'));
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully updated user profile',
    data: updatedUser,
  });
};
