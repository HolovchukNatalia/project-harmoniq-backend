import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import multer from 'multer';
import { validateBody } from '../middlewares/validateBody.js';
import { updateUserSchema } from '../validation/updateUserSchema.js';
import { saveArticleToUserController } from '../controllers/users/saveArticleToUserController.js';
import { patchUserProfileController } from '../controllers/users/patchUserProfile.js';
import { getUsersAllController } from '../controllers/users/getUsersAllController.js';
import { getUserByIdController } from '../controllers/users/getUserByIdController.js';

const upload = multer({ dest: 'uploads/' });

const router = Router();
router.post(
  '/:userId/save/:articleId',
  authenticate,
  ctrlWrapper(saveArticleToUserController),
);
router.get('/:userId/', ctrlWrapper(getUserByIdController));
router.get('/', ctrlWrapper(getUsersAllController));

router.patch(
  '/:userId',
  authenticate,
  upload.single('avatarUrl'),
  validateBody(updateUserSchema),
  ctrlWrapper(patchUserProfileController),
);

export default router;
