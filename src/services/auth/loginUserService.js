import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';

import User from '../../db/models/user.js';
import Session from '../../db/models/session.js';

import { generateSessionTokens } from '../../utils/generateSessionTokens.js';

export const loginUser = async (payload) => {
  console.log('payload:', payload);
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

  const existingSession = await Session.findOne({ userId: user._id });
  const now = new Date();

  if (existingSession && existingSession.refreshTokenValidUntil > now) {
    const newTokens = generateSessionTokens();
    await Session.findByIdAndUpdate(existingSession._id, { ...newTokens });

    const updatedSession = await Session.findById(existingSession._id);
    return { session: updatedSession, user };
  } else {
    const session = await Session.create({
      ...generateSessionTokens(),
      userId: user._id,
    });
    return { session, user };
  }
};
