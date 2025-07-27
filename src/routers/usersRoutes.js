import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  allUsersInfoController,
  saveArticleToUserController,
  userInfoController,
} from '../controllers/userInfoController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();
router.use('/', authenticate);
router.post(
  '/:userId/save/:articleId',
  ctrlWrapper(saveArticleToUserController),
);
router.get('/:userId/', ctrlWrapper(userInfoController));
router.get('/', ctrlWrapper(allUsersInfoController));
export default router;
