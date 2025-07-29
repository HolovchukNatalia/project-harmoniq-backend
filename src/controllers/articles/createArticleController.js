import { createArticle } from '../../services/articles/articlesCRUD.js';
import { uploadImageFile } from '../../utils/uploadImageFile.js';
import { articleSchema } from '../../validation/articleShema.js';

export const createArticleController = async (req, res, next) => {
  const image = await uploadImageFile(req.file);

  const updateData = {
    ...req.body,
    ...(image && { image }),
  };

  const { error } = articleSchema.validate(updateData);
  if (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }

  const article = await createArticle(updateData);

  res.status(201).json({
    status: 201,
    message: 'Successfully created an article!',
    data: article,
  });
};
