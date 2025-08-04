import express from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema } from '../validation/registerUserSchema.js';
import { registerUserController } from '../controllers/auth/registerUserController.js';
import { loginUserSchema } from '../validation/loginUserSchema.js';
import { loginUserController } from '../controllers/auth/loginUserController.js';
import { logoutUserController } from '../controllers/auth/logoutUserController.js';
import { refreshSessionController } from '../controllers/auth/refreshSessionController.js';

const router = express.Router();

// Публічні маршрути
router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);
router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);
router.post('/logout', ctrlWrapper(logoutUserController));
router.post('/refresh', ctrlWrapper(refreshSessionController));

export default router;
