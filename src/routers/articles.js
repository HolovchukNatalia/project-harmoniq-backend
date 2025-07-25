import { Router } from 'express';
import {
  getArticlesController,
  getArticleByIdController,
  createArticleController,
  deleteArticleController,
} from '../controllers/articles.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { articleShema } from '../validation/articleShema.js';
const router = Router();
router.get('/articles', ctrlWrapper(getArticlesController));
router.get('/articles/:articleId', ctrlWrapper(getArticleByIdController));
router.post(
  '/articles',
  validateBody(articleShema),
  ctrlWrapper(createArticleController),
);
router.delete('/articles/:articleId', ctrlWrapper(deleteArticleController));

export default router;
