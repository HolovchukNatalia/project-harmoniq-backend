import express from 'express';
import { registerUserController } from '../controllers/registerUserController.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserSchema } from '../validation/registerUserSchema.js';
import { loginUserController } from '../controllers/loginUserController.js';
import { logoutUserController } from '../controllers/logoutUserController.js';
import { loginUserSchema } from '../validation/loginUserSchema.js';

const router = express.Router();

router.post('/register', validateBody(registerUserSchema), registerUserController);
router.post('/login',validateBody(loginUserSchema), loginUserController);
router.post('/logout', logoutUserController);

export default router;
