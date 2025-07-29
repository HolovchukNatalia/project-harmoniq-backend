import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { articleSchema } from '../validation/articleShema.js';
import { getArticlesController } from '../controllers/articles/getArticlesController.js';
import { getArticleByIdController } from '../controllers/articles/getArticleByIdController.js';
import { createArticleController } from '../controllers/articles/createArticleController.js';
import { deleteArticleController } from '../controllers/articles/deleteArticleController.js';

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
