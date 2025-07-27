import { Router } from 'express';
import {
  getArticlesController,
  getArticleByIdController,
  createArticleController,
  deleteArticleController,
} from '../controllers/articlesController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { articleSchema } from '../validation/articleShema.js';

const router = Router();

// Публічні маршрути
router.get('/', ctrlWrapper(getArticlesController));
router.get('/:articleId', ctrlWrapper(getArticleByIdController));

// Приватні маршрути
router.post(
  '/',
  authenticate,
  validateBody(articleSchema),
  ctrlWrapper(createArticleController),
);

router.delete(
  '/:articleId',
  authenticate,
  ctrlWrapper(deleteArticleController),
);

export default router;
