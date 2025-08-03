export const calculatePaginationData = (count, perPage, page) => {
  const totalPages = Math.ceil(count / perPage);
  const currentPage = page > totalPages ? 1 : page;
  const hasNextPage = Boolean(totalPages - currentPage);
  const hasPreviousPage = currentPage !== 1;

  return {
    page: currentPage,
    perPage,
    totalItems: count,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};
