import { logoutUser } from '../../services/auth/logoutUserService.js';
import { clearSecureCookie } from '../../utils/cookie/clearSecureCookie.js';

export const logoutUserController = async (req, res) => {
  const { sessionId, sessionToken } = req.cookies;

  const isLoggedOut = await logoutUser(sessionId, sessionToken);

  clearSecureCookie(res, 'sessionId');
  clearSecureCookie(res, 'sessionToken');

  if (!isLoggedOut) {
    return res.status(401).json({
      status: 401,
      message: 'Invalid session or already logged out',
    });
  }

  res.status(204).send();
};
