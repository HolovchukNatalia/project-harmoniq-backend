import createHttpError from 'http-errors';
import User from '../../db/models/user.js';
import { uploadImageFile } from '../../utils/uploadImageFile.js';
import { cleanUser } from '../../utils/cleanUser.js';

export const patchUserProfileController = async (req, res, next) => {
  const { userId } = req.params;
  const image = await uploadImageFile(req.file);

  const updateData = {
    ...req.body,
  };
  if (image) {
    updateData.avatarUrl = image;
  }

  const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    return next(createHttpError(404, 'User not found'));
  }

  const cleanedUser = cleanUser(updatedUser);

  res.status(200).json({
    status: 200,
    message: 'Successfully updated user profile',
    data: { user: cleanedUser },
  });
};
