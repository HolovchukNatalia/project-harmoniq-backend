import User from '../../db/models/666.js';

export const registerUserService = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return null;
  }

  const newUser = await User.create({ name, email, password });

  return newUser;
};
