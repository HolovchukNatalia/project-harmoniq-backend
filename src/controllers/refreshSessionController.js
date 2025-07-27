import { refreshSession } from '../services/auth/refreshSession.js';

export const refreshSessionController = async (req, res) => {
  const { sessionId, sessionToken } = req.cookies;
  const { session, user } = await refreshSession(sessionId, sessionToken);
  res.cookie('sessionId', session.id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
    sameSite: 'none',
    secure: true,
    path: '/',
  });

  res.cookie('sessionToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
    sameSite: 'none',
    secure: true,
    path: '/',
  });

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    },
  });
};
