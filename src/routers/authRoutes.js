import express from 'express';
import registerUserController from '../controllers/registerUserController.js';
import { loginUserController } from '../controllers/loginUserController.js';
import { logoutUserController } from '../controllers/logoutUserController.js';
import { refreshSessionController } from '../controllers/refreshSessionController.js';
import { registerUserSchema } from '../validation/registerUserSchema.js';
import { loginUserSchema } from '../validation/loginUserSchema.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

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
