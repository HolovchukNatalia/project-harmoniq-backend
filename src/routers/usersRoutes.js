import { Router } from 'express';
import { getSavedArticles, saveArticleToUser } from '../controllers/articles';
import { ctrlWrapper } from '../utils/ctrlWrapper';

const router = Router();
router.post('/:userId/saved/:articleId', ctrlWrapper(saveArticleToUser));
router.get('/:userId/saved', ctrlWrapper(getSavedArticles));
export default router;
