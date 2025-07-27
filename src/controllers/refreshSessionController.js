import { refreshSession } from '../services/refreshSession.js';

export const refreshSessionController = async (req, res) => {
  const { sessionId, sessionToken } = req.cookies;

  const session = await refreshSession(sessionId, sessionToken);

  res.cookie('sessionId', session.id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.send({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
