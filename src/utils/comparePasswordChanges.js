import bcrypt from 'bcrypt';
import { hashPassword } from './hashPassword.js';

export const comparePasswordChanges = async (
  oldPassword,
  newPassword,
  savedPassword,
) => {
  const isMatch = await bcrypt.compare(oldPassword, savedPassword);

  if (!isMatch) {
    throw new Error('The old password did not match');
  }

  return hashPassword(newPassword);
};
