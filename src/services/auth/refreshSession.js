import createHttpError from 'http-errors';
import Session from '../../db/models/session.js';
import { generateSessionTokens } from '../../utils/generateSessionTokens.js';
import User from '../../db/models/user.js';

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

  const newTokens = generateSessionTokens();

  const updatedSession = await Session.findOneAndUpdate(
    { _id: sessionId },
    {
      accessToken: newTokens.accessToken,
      refreshToken: newTokens.refreshToken,
      accessTokenValidUntil: newTokens.accessTokenValidUntil,
      refreshTokenValidUntil: newTokens.refreshTokenValidUntil,
    },
    { new: true },
  );

  return { session: updatedSession, user };
};
