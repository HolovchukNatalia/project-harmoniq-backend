import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { registerUserService } from '../../services/auth/registerUserService.js';
import { cleanUser } from '../../utils/cleanUser.js';

export const registerUserController = async (req, res, next) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await registerUserService({
    name,
    email,
    password: hashedPassword,
  });

  if (!user) {
    return next(createHttpError(409, 'Email in use'));
  }

  const cleanedUser = cleanUser(user);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: { user: cleanedUser },
  });
};
