import { Router } from 'express';
import {
  getArticlesController,
  getArticleByIdController,
  createArticleController,
  deleteArticleController,
  saveArticleToUser,
  getSavedArticles,
} from '../controllers/articles.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
const router = Router();
router.get('/articles', ctrlWrapper(getArticlesController));
router.get('/articles/:articleId', ctrlWrapper(getArticleByIdController));
router.post('/articles', ctrlWrapper(createArticleController));
router.delete('/articles/:articleId', ctrlWrapper(deleteArticleController));
router.post('/users/:userId/save/:articleId', ctrlWrapper(saveArticleToUser));
router.get('/users/:userId/saved', ctrlWrapper(getSavedArticles));
export default router;
