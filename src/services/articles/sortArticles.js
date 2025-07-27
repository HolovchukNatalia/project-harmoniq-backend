export const sortArticles = (data, sortMethod) => {
  if (!sortMethod || sortMethod === 'all') {
    return data;
  }

  let sortedData = [...data];

  if (sortMethod === 'popular') {
    sortedData.sort((a, b) => b.rate - a.rate);
  }

  return sortedData;
};
