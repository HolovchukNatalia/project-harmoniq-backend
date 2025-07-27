import { Session } from '../db/models/session.js';

export const logoutUser = async (sessionId, sessionToken) => {
  const deletedSession = await Session.findOneAndDelete({
    _id: sessionId,
    refreshToken: sessionToken,
  });

  return Boolean(deletedSession);
};
