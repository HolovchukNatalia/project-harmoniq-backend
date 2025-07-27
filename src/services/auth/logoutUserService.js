import { Session } from '../../db/models/123.js';

export const logoutUser = async (sessionId, sessionToken) => {
  const deletedSession = await Session.findOneAndDelete({
    _id: sessionId,
    refreshToken: sessionToken,
  });

  return Boolean(deletedSession);
};
