import { refreshSession } from '../../services/auth/refreshSession.js';
import { setSecureCookie } from '../../utils/cookie/setSecureCookie.js';

export const refreshSessionController = async (req, res) => {
  const { sessionToken } = req.cookies;

  if (!sessionToken) {
    return res.status(401).json({ status: 401, message: 'Unauthorized' });
  }

  const { accessToken, refreshToken, refreshTokenValidUntil } =
    await refreshSession(sessionToken);

  setSecureCookie(res, 'sessionToken', refreshToken, {
    expires: new Date(refreshTokenValidUntil),
  });

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: accessToken,
    },
  });
};
