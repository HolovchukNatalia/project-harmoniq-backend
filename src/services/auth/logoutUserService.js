import { Session } from '../../db/models/Session.js';

export const logoutUser = async (sessionId, sessionToken) => {
  const deletedSession = await Session.findOneAndDelete({
    _id: sessionId,
    refreshToken: sessionToken,
  });

  return Boolean(deletedSession);
};
