import { refreshSession } from '../../services/auth/refreshSession.js';
import { cleanUser } from '../../utils/cleanUser.js';
import { setSecureCookie } from '../../utils/cookie/setSecureCookie.js';
import { getUserContent } from '../../utils/getUserContent.js';

export const refreshSessionController = async (req, res) => {
  const { sessionId, sessionToken } = req.cookies;

  if (!sessionId || !sessionToken) {
    return res.status(401).json({ status: 401, message: 'Unauthorized' });
  }

  const { session, user } = await refreshSession(sessionId, sessionToken);

  setSecureCookie(res, 'sessionId', session.id, {
    expires: session.refreshTokenValidUntil,
  });
  setSecureCookie(res, 'sessionToken', session.refreshToken, {
    expires: session.refreshTokenValidUntil,
  });

  const cleanedUser = cleanUser(user);
  const { userArticles, savedArticles } = await getUserContent(
    user._id,
    user.saved,
  );
  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
      user: cleanedUser,
      userArticles,
      savedArticles,
    },
  });
};
