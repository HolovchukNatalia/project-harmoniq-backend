import createHttpError from 'http-errors';
import User from '../../db/models/user.js';
import { uploadImageFile } from '../../utils/uploadImageFile.js';
import { cleanUser } from '../../utils/cleanUser.js';
import { comparePasswordChanges } from '../../utils/comparePasswordChanges.js';

export const patchUserProfileController = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    throw createHttpError(404, `User with id ${userId} not found`);
  }

  const { oldPassword, newPassword, newName } = req.body;

  const updateData = {};

  if (newName) updateData.name = newName;
  if (oldPassword && newPassword) {
    updateData.password = await comparePasswordChanges(
      oldPassword,
      newPassword,
      user.password,
    );
  }
  if (req.file) {
    updateData.avatarUrl = await uploadImageFile(req.file);
  }

  const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    throw createHttpError(404, `User with id ${userId} not found`);
  }

  const cleanedUser = cleanUser(updatedUser);

  res.status(200).json({
    status: 200,
    message: 'Successfully updated user profile',
    data: { user: cleanedUser },
  });
};
