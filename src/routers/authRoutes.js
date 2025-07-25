import express from 'express';
import { registerUserController } from '../controllers/registerUserController.js';
import { getCurrentUserController } from '../controllers/getCurrentUserController.js';
import { validateBody } from '../middlewares/validateBody.js';
import { protect } from '../middlewares/authMiddleware.js';
import { registerUserSchema } from '../validation/registerUserSchema.js';

const router = express.Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  registerUserController,
);

router.get('/me', protect, getCurrentUserController);

export default router;
