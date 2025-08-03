import createHttpError from 'http-errors';
import { logoutUser } from '../../services/auth/logoutUserService.js';
import { clearSecureCookie } from '../../utils/cookie/clearSecureCookie.js';

export const logoutUserController = async (req, res, next) => {
  const { sessionId, sessionToken } = req.cookies;

  if (!sessionId || !sessionToken) {
    throw createHttpError(401, 'Unauthorized: missing session cookies');
  }

  const isLoggedOut = await logoutUser(sessionId, sessionToken);

  clearSecureCookie(res, 'sessionId');
  clearSecureCookie(res, 'sessionToken');

  if (!isLoggedOut) {
    throw createHttpError(401, 'Invalid session or already logged out');
  }

  res.status(204).send();
};
