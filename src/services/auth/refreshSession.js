import createHttpError from 'http-errors';
import Session from '../../db/models/session.js';
import { generateSessionTokens } from '../../utils/generateSessionTokens.js';

export const refreshSession = async (refreshToken) => {
  const session = await Session.findOne({ refreshToken });

  if (!session) {
    throw createHttpError(401, 'Session not found!');
  }
  if (session.refreshTokenValidUntil < new Date()) {
    throw createHttpError(401, 'Session expired');
  }

  const newTokens = generateSessionTokens();

  await Session.findOneAndUpdate({ _id: session._id }, { ...newTokens });

  return {
    accessToken: newTokens.accessToken,
    refreshToken: newTokens.refreshToken,
    accessTokenValidUntil: newTokens.accessTokenValidUntil,
    refreshTokenValidUntil: newTokens.refreshTokenValidUntil,
  };
};
