import User from '../../db/models/user.js';
import createHttpError from 'http-errors';
import Session from '../../db/models/session.js';
import { generateSessionTokens } from '../../utils/generateSessionTokens.js';
import bcrypt from 'bcrypt';

export const registerUserService = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ name, email, password: hashedPassword });

  const sessionTokens = generateSessionTokens();

  const session = await Session.create({
    ...sessionTokens,
    userId: newUser._id,
  });

  return { user: newUser, session };
};
