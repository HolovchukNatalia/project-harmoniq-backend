export const sortArticles = (data, sortMethod) => {
  if (!sortMethod || sortMethod === 'all') {
    return data;
  }

  if (sortMethod === 'popular') {
    return data.toSorted((a, b) => b.rate - a.rate);
  }

  return data;
};
