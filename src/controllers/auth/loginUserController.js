import createHttpError from 'http-errors';
import { loginUser } from '../../services/auth/loginUserService.js';
import { cleanUser } from '../../utils/cleanUser.js';
import { setSecureCookie } from '../../utils/cookie/setSecureCookie.js';
import { getUserContent } from '../../utils/getUserContent.js';

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw createHttpError(400, 'Email and password are required');
  }

  const { session, user } = await loginUser(req.body);

  if (!session || !user) {
    throw createHttpError(401, 'Invalid email or password');
  }

  setSecureCookie(res, 'sessionId', session.id, {
    expires: session.refreshTokenValidUntil,
  });
  setSecureCookie(res, 'sessionToken', session.refreshToken, {
    expires: session.refreshTokenValidUntil,
  });

  const cleanedUser = cleanUser(user);

  const { userArticles, savedArticles } = await getUserContent(
    user._id,
    user.saved,
  );

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
      user: cleanedUser,
      userArticles,
      savedArticles,
    },
  });
};
