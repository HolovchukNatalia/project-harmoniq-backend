export function clearSecureCookie(res, name) {
  res.clearCookie(name, {
    path: '/',
    sameSite: 'none',
    secure: true,
    httpOnly: true,
  });
}
