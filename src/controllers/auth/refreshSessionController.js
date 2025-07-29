import { refreshSession } from '../../services/auth/refreshSession.js';
import { cleanUser } from '../../utils/cleanUser.js';
import { setSecureCookie } from '../../utils/cookie/setSecureCookie.js';

export const refreshSessionController = async (req, res) => {
  const { sessionId, sessionToken } = req.cookies;
  const { session, user } = await refreshSession(sessionId, sessionToken);

  setSecureCookie(res, 'sessionId', session.id, {
    expires: session.refreshTokenValidUntil,
  });
  setSecureCookie(res, 'sessionToken', session.refreshToken, {
    expires: session.refreshTokenValidUntil,
  });

  const cleanedUser = cleanUser(user);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
      user: cleanedUser,
    },
  });
};
