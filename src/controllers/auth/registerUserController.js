import createHttpError from 'http-errors';
import { registerUserService } from '../../services/auth/registerUserService.js';
import { cleanUser } from '../../utils/cleanUser.js';
import { hashPassword } from '../../utils/hashPassword.js';

export const registerUserController = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw createHttpError(400, 'Missing required fields');
  }

  const hashedPassword = await hashPassword(password);

  const user = await registerUserService({
    name,
    email,
    password: hashedPassword,
  });

  if (!user) {
    throw createHttpError(409, 'Email in use');
  }

  const cleanedUser = cleanUser(user);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: { user: cleanedUser },
  });
};
