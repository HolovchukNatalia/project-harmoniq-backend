import createHttpError from 'http-errors';
import { registerUserService } from '../../services/auth/registerUserService.js';
import { cleanUser } from '../../utils/cleanUser.js';
import { setSecureCookie } from '../../utils/cookie/setSecureCookie.js';

export const registerUserController = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw createHttpError(400, 'Missing required fields');
  }

  const { user, session } = await registerUserService({
    name,
    email,
    password,
  });

  setSecureCookie(res, 'sessionToken', session.refreshToken, {
    expires: new Date(session.refreshTokenValidUntil),
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
      accessToken: session.accessToken,
      user: cleanUser(user),
    },
  });
};
