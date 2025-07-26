import { Router } from 'express';
import { getSavedArticles, saveArticleToUser } from '../controllers/articles.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();
router.post('/:userId/saved/:articleId', ctrlWrapper(saveArticleToUser));
router.get('/:userId/saved', ctrlWrapper(getSavedArticles));
export default router;
