import createHttpError from 'http-errors';
import { loginUser } from '../../services/auth/loginUserService.js';
import { cleanUser } from '../../utils/cleanUser.js';
import { setSecureCookie } from '../../utils/cookie/setSecureCookie.js';

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw createHttpError(400, 'Email and password are required');
  }

  const { session, user } = await loginUser({ email, password });

  if (!session || !user) {
    throw createHttpError(401, 'Invalid email or password');
  }

  setSecureCookie(res, 'sessionToken', session.refreshToken, {
    expires: new Date(session.refreshTokenValidUntil),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in!',
    data: {
      accessToken: session.accessToken,
      user: cleanUser(user),
    },
  });
};
