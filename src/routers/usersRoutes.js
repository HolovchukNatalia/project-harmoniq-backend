import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  allUsersInfoController,
  patchUserController,
  saveArticleToUserController,
  userInfoController,
} from '../controllers/userInfoController.js';
import { authenticate } from '../middlewares/authenticate.js';
import multer from 'multer';
import { validateBody } from '../middlewares/validateBody.js';
import { updateUserSchema } from '../validation/updateUserSchema.js';

const upload = multer({ dest: 'uploads/' });

const router = Router();
router.post(
  '/:userId/save/:articleId',
  authenticate,
  ctrlWrapper(saveArticleToUserController),
);
router.get('/:userId/', ctrlWrapper(userInfoController));
router.get('/', ctrlWrapper(allUsersInfoController));

router.patch(
  '/:userId',
  authenticate,
  upload.single('avatarUrl'),
  validateBody(updateUserSchema),
  ctrlWrapper(patchUserController),
);

export default router;
