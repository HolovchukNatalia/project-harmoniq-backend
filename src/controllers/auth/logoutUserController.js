import createHttpError from 'http-errors';
import { logoutUser } from '../../services/auth/logoutUserService.js';
import { clearSecureCookie } from '../../utils/cookie/clearSecureCookie.js';

export const logoutUserController = async (req, res) => {
  const { sessionToken } = req.cookies;

  if (!sessionToken) {
    throw createHttpError(401, 'Unauthorized: missing session token cookie');
  }

  const isLoggedOut = await logoutUser(sessionToken);

  clearSecureCookie(res, 'sessionToken');

  if (!isLoggedOut) {
    throw createHttpError(401, 'Invalid session or already logged out');
  }

  res.status(204).send();
};
