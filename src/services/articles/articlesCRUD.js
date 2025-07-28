import mongoose from 'mongoose';
import Article from '../../db/models/article.js';
import { calculatePaginationData } from '../../utils/calculatePaginationData.js';

export const getAllArticles = async ({ page, perPage, sortMethod, ownerId }) => {

  const limit = perPage;
  const skip = (page - 1) * perPage;

  const filter = ownerId ? { ownerId } : {};

  const articlesQuery = Article.find(filter);

  if (sortMethod === 'popular') {
    articlesQuery.sort({ rate: -1 });
  }

  const articlesCount = await Article.countDocuments(filter);
  const articles = await articlesQuery.skip(skip).limit(limit).exec();
  const paginationData = calculatePaginationData(articlesCount, perPage, page);
  return {
    articles,
    paginationData,
  };
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
