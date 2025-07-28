import { allUsersInfoService } from '../services/users/allUsersInfoService.js';
import { getUserArticlesServise } from '../services/users/getUserArticlesServise.js';
import { saveArticleToUserServise } from '../services/users/saveArticleToUserServise.js';
import { userInfoService } from '../services/users/userInfoService.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import User from '../db/models/user.js';
import createHttpError from 'http-errors';
import { getEnvVar } from '../utils/getEvnVar.js';

export const userInfoController = async (req, res, next) => {
  const { userId } = req.params;

  const user = await userInfoService(userId);
  const userArticles = await getUserArticlesServise(userId);
  res.status(200).json({
    status: 200,
    message: `User with ${userId} successfull found`,
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
  const photo = req.file;
  let avatarUrl;

  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      avatarUrl = await saveFileToCloudinary(photo);
    } else {
      avatarUrl = await saveFileToUploadDir(photo);
    }
  }

  const updateData = {
    ...req.body,
  };
  if (avatarUrl) {
    updateData.avatarUrl = avatarUrl;
  }

  const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  });
  if (!updatedUser) {
    return next(createHttpError(404, 'User not found'));
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully updated user profile',
    data: updatedUser,
  });
};
