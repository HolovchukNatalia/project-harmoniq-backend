import Article from '../../db/models/article.js';
import { calculatePaginationData } from '../../utils/calculatePaginationData.js';

export const getAllArticles = async ({
  page = 1,
  perPage = 10,
  filter = 'all',
  limit = null,
}) => {
  const totalArticlesCount = await Article.countDocuments();

  const maxCount = limit
    ? Math.min(totalArticlesCount, limit)
    : totalArticlesCount;

  const maxPages = Math.ceil(maxCount / perPage);

  const safePage = page > maxPages && maxPages > 0 ? 1 : page;

  const skip = (safePage - 1) * perPage;

  const limitForPage = Math.min(perPage, maxCount - skip);

  if (skip >= maxCount) {
    return {
      articles: [],
      paginationData: calculatePaginationData(maxCount, perPage, safePage),
    };
  }

  let articlesQuery = Article.find();

  if (filter === 'popular') {
    articlesQuery = articlesQuery.sort({ rate: -1 });
  }

  articlesQuery = articlesQuery
    .skip(skip)
    .limit(limitForPage)
    .populate('ownerId', 'name')
    .lean();

  const articles = await articlesQuery.exec();

  const articlesWithAuthor = articles.map((article) => ({
    ...article,
    author: article.ownerId?.name || 'Unknown Author',
    ownerId: article.ownerId?._id || article.ownerId,
  }));

  const paginationData = calculatePaginationData(maxCount, perPage, safePage);

  return {
    articles: articlesWithAuthor,
    paginationData,
  };
};
