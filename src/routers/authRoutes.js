import express from 'express';
import { registerUserController } from '../controllers/registerUserController.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserSchema } from '../validation/registerUserSchema.js';

const router = express.Router();

router.post('/register', validateBody(registerUserSchema), registerUserController);

export default router;
