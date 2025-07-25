import bcrypt from 'bcrypt';
import { AppError, catchAsync } from '../utils/errorUtils.js';
import { registerUserService } from '../services/registerUserService.js';

const registerUserController = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await registerUserService({
    name,
    email,
    password: hashedPassword,
  });

  if (!user) {
    return next(new AppError('Email in use', 409));
  }

  res.status(201).json({
    status: 'success',
    message: 'Successfully registered a user!',
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

export default registerUserController;
