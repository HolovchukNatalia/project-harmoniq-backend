import mongoose from 'mongoose';
import Article from '../../db/models/article.js';
import { calculatePaginationData } from '../../utils/calculatePaginationData.js';

export const getAllArticles = async ({ page, perPage, sortMethod }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  let articlesQuery = Article.find();

  if (sortMethod === 'popular') {
    articlesQuery = articlesQuery.sort({ rate: -1 });
  }

  articlesQuery = articlesQuery
    .skip(skip)
    .limit(limit)
    .populate('ownerId', 'name')
    .lean();

  const articlesCount = await Article.countDocuments();
  const articles = await articlesQuery.exec();

  const articlesWithAuthor = articles.map((article) => ({
    ...article,
    author: article.ownerId?.name || null,
    ownerId: article.ownerId?._id || article.ownerId,
  }));

  const paginationData = calculatePaginationData(articlesCount, perPage, page);

  return {
    articles: articlesWithAuthor,
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
