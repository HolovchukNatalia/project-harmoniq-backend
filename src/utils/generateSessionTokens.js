import crypto from 'node:crypto';

export const generateSessionTokens = () => ({
  accessToken: crypto.randomBytes(30).toString('base64'),
  refreshToken: crypto.randomBytes(30).toString('base64'),
  accessTokenValidUntil: new Date(Date.now() + 1000 * 60 * 15),
  refreshTokenValidUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
});
