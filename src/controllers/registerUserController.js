import bcrypt from 'bcrypt';
import createError from 'http-errors';
import { registerUserService } from '../services/registerUserService.js';

export const registerUserController = async (req, res) => {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await registerUserService({ name, email, password: hashedPassword });

    if (!user) {
        throw createError(409, 'Email in use');
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
