export const cleanUser = (user) => {
  if (!user) return null;

  const userObj = user.toObject ? user.toObject() : { ...user };

  if ('password' in userObj) delete userObj.password;
  if ('email' in userObj) delete userObj.email;

  return userObj;
};
