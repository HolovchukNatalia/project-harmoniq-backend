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
import { getPopularUsersController } from '../controllers/users/getPopularUsersController.js';
import { deleteArticleFromUserController } from '../controllers/users/deleteArticleFromUserController.js';

const upload = multer({ dest: 'uploads/' });

const router = Router();

router.get('/', ctrlWrapper(getUsersAllController));
router.get('/popular', ctrlWrapper(getPopularUsersController));

router.get('/:userId/', ctrlWrapper(getUserByIdController));

router.post(
  '/:userId/save/:articleId',
  authenticate,
  ctrlWrapper(saveArticleToUserController),
);

router.patch(
  '/:userId',
  authenticate,
  upload.single('image'),
  validateBody(updateUserSchema),
  ctrlWrapper(patchUserProfileController),
);

router.delete(
  '/:userId/save/:articleId',
  authenticate,
  ctrlWrapper(deleteArticleFromUserController),
);

export default router;
