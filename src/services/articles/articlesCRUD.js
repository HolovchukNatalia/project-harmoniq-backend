import mongoose from 'mongoose';
import Article from '../../db/models/article.js';
import { calculatePaginationData } from '../../utils/calculatePaginationData.js';
import User from '../../db/models/user.js';

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
  const article = await Article.findOne({ _id: articleId })
    .populate('ownerId', 'name')
    .lean();

  return {
    ...article,
    author: article?.ownerId?.name || null,
    ownerId: article?.ownerId?._id || article.ownerId,
  };
};

export const createArticle = async (payload) => {
  const article = await Article.create(payload);
  const { ownerId } = payload;
  const user = await User.findById(ownerId);
  user.articlesAmount = (user.articlesAmount || 0) + 1;
  await user.save({ validateBeforeSave: false });
  return article;
};

export const deleteArticle = async (articleId) => {
  if (!mongoose.Types.ObjectId.isValid(articleId)) {
    return null;
  }
  const article = await Article.findByIdAndDelete(articleId);
  console.log('article:', article);
  const { ownerId } = article;
  const user = await User.findById(ownerId);
  user.articlesAmount = (user.articlesAmount || 1) - 1;
  await user.save({ validateBeforeSave: false });

  return article;
};
