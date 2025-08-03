import createHttpError from 'http-errors';
import { createArticle } from '../../services/articles/articlesCRUD.js';
import { uploadImageFile } from '../../utils/uploadImageFile.js';
import { articleSchema } from '../../validation/articleShema.js';

export const createArticleController = async (req, res) => {
  const image = await uploadImageFile(req.file);

  const updateData = {
    ...req.body,
    ...(image && { image }),
  };

  const { error } = articleSchema.validate(updateData);
  if (error) {
    throw createHttpError(400, error.message);
  }

  const article = await createArticle(updateData);

  if (!article) {
    throw createHttpError(500, 'Failed to create article');
  }

  res.status(201).json({
    status: 201,
    message: 'Successfully created an article!',
    data: article,
  });
};
