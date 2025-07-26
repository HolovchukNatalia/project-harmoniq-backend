import { Router } from 'express';
import {
  getSavedArticles,
  saveArticleToUser,
} from '../controllers/articles.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { userInfoController } from '../controllers/userInfoController.js';

const router = Router();
router.post('/:userId/saved/:articleId', ctrlWrapper(saveArticleToUser));
router.get('/:userId/saved', ctrlWrapper(getSavedArticles));
router.get('/:userId/', ctrlWrapper(userInfoController));
export default router;
