import Session from '../../db/models/session.js';

export const logoutUser = async (refreshToken) => {
  const deletedSession = await Session.findOneAndDelete({
    refreshToken,
  });

  return Boolean(deletedSession);
};
