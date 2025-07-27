import { loginUser } from '../services/auth/loginUserService.js';

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  res.cookie('sessionId', session.id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
