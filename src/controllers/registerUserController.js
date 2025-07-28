import bcrypt from 'bcrypt';
import { registerUserService } from '../services/auth/registerUserService.js';
import createHttpError from 'http-errors';

const registerUserController = async (req, res, next) => {
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

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

export default registerUserController;
