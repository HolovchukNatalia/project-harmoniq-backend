import Article from '../../db/models/article.js';

import User from '../../db/models/user.js';

export const getPopularArticlesService = async (limit = 5) => {
  const articles = await Article.find().sort({ rate: -1 }).limit(limit).lean();

  for (const article of articles) {
    const user = await User.findById(article.ownerId).select('name').lean();
    article.author = user ? user.name : null;
  }

  return articles;
};
