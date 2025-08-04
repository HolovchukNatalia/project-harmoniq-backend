import createHttpError from 'http-errors';

import Session from '../../db/models/session.js';
import User from '../../db/models/user.js';

import { generateSessionTokens } from '../../utils/generateSessionTokens.js';

export const refreshSession = async (sessionId, sessionToken) => {
  const session = await Session.findOne({
    _id: sessionId,
    refreshToken: sessionToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found!');
  }
  if (session.refreshTokenValidUntil < new Date()) {
    throw createHttpError(401, 'Session expired');
  }

  const user = await User.findById(session.userId);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  await Session.findByIdAndDelete(session._id);

  const newSession = await Session.create({
    ...generateSessionTokens(),
    userId: user._id,
  });

  return { session: newSession, user };
};
