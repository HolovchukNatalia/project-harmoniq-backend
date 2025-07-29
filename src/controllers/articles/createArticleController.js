import { createArticle } from '../../services/articles/articlesCRUD.js';

export const createArticleController = async (req, res) => {
  const article = await createArticle(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created an article!',
    data: article,
  });
};
