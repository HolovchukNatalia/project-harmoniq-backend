import { logoutUser } from '../services/logoutUserService.js';

export const logoutUserController = async (req, res) => {
  const { sessionId, sessionToken } = req.cookies;

  const isLoggedOut = await logoutUser(sessionId, sessionToken);

  res.clearCookie('sessionToken');
  res.clearCookie('sessionId');

  if (!isLoggedOut) {
    return res
      .status(401)
      .json({ message: 'Invalid session or already logged out' });
  }

  res.status(204).send();
};
