import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';

import User from '../../db/models/user.js';

import { generateSessionTokens } from '../../utils/generateSessionTokens.js';
import { Session } from '../../db/models/session.js';

export const loginUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(401, 'User or password doesn`t match');
  }

  const arePasswordEqual = await bcrypt.compare(
    payload.password,
    user.password,
  );

  if (!arePasswordEqual) {
    throw createHttpError(401, 'User or password doesn`t match');
  }

  await Session.findOneAndDelete({ userId: user._id });

  const session = await Session.create({
    ...generateSessionTokens(),
    userId: user._id,
  });

  return session;
};
