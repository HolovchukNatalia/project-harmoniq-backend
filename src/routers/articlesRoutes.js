import { Router } from 'express';
import {
  getArticlesController,
  getArticleByIdController,
  createArticleController,
  deleteArticleController,
} from '../controllers/articles.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { articleSchema } from '../validation/articleShema.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();
router.use('/', authenticate);
router.get('/', ctrlWrapper(getArticlesController));
router.get('/:articleId', ctrlWrapper(getArticleByIdController));
router.post(
  '/',
  validateBody(articleSchema),
  ctrlWrapper(createArticleController),
);
router.delete('/:articleId', ctrlWrapper(deleteArticleController));

export default router;
