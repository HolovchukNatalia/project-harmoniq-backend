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
import { validateBody } from '../middlewares/validateBody.js';
import { articleSchema } from '../validation/articleShema.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();
router.use('/articles', authenticate);
router.get('/articles', ctrlWrapper(getArticlesController));
router.get('/articles/:articleId', ctrlWrapper(getArticleByIdController));
router.post(
  '/articles',
  validateBody(articleSchema),
  ctrlWrapper(createArticleController),
);
router.delete('/articles/:articleId', ctrlWrapper(deleteArticleController));
router.post('/users/:userId/saved/:articleId', ctrlWrapper(saveArticleToUser));
router.get('/users/:userId/saved', ctrlWrapper(getSavedArticles));
export default router;
