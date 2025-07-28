export function setSecureCookie(res, name, value, options = {}) {
  const defaultOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
  };

  const cookieOptions = { ...defaultOptions, ...options };

  res.cookie(name, value, cookieOptions);
}
