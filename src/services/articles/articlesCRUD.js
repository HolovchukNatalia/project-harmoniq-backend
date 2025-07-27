import mongoose from 'mongoose';
import Article from '../../db/models/Article.js';
export const getAllArticles = async () => {
  const articles = await Article.find();
  return articles;
};

export const getArticleById = async (articleId) => {
  const article = await Article.findOne({ _id: articleId });
  return article;
};

export const createArticle = async (payload) => {
  const article = await Article.create(payload);
  return article;
};

export const deleteArticle = async (articleId) => {
  if (!mongoose.Types.ObjectId.isValid(articleId)) {
    return null;
  }
  const article = await Article.findByIdAndDelete(articleId);
  return article;
};
