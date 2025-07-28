import { loginUser } from '../services/auth/loginUserService.js';

export const loginUserController = async (req, res) => {
  const { session, user } = await loginUser(req.body);

  res.cookie('sessionId', session.id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
    sameSite: 'none',
    secure: true,
    path: '/',
  });

  res.cookie('sessionToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
    sameSite: 'none',
    secure: true,
    path: '/',
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
