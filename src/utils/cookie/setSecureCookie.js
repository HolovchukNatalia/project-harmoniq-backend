import { isDevEnv } from '../isDevEnv.js';

export function setSecureCookie(res, name, value, options = {}) {
  const defaultOptions = {
    httpOnly: true,
    secure: !isDevEnv(),
    sameSite: isDevEnv() ? 'lax' : 'none',
    path: '/',
  };

  const cookieOptions = { ...defaultOptions, ...options };

  res.cookie(name, value, cookieOptions);
}
