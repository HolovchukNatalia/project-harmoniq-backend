import { logoutUser } from '../services/auth/logoutUserService.js';

export const logoutUserController = async (req, res) => {
  const { sessionId, sessionToken } = req.cookies;

  const isLoggedOut = await logoutUser(sessionId, sessionToken);

  res.clearCookie('sessionToken', {
    path: '/',
    sameSite: 'none',
    secure: true,
  });
  res.clearCookie('sessionId', {
    path: '/',
    sameSite: 'none',
    secure: true,
  });

  if (!isLoggedOut) {
    return res.status(401).json({
      status: 401,
      message: 'Invalid session or already logged out',
    });
  }

  res.status(204).send();
};
