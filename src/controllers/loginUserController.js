import { loginUser } from '../services/auth/loginUserService.js';
import { setSecureCookie } from '../utils/cookie/setSecureCookie.js';

export const loginUserController = async (req, res) => {
  const { session, user } = await loginUser(req.body);

  setSecureCookie(res, 'sessionId', session.id, {
    expires: session.refreshTokenValidUntil,
  });
  setSecureCookie(res, 'sessionToken', session.refreshToken, {
    expires: session.refreshTokenValidUntil,
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
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
