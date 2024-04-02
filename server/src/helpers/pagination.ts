export const getPaginationFromQuery = (query: any) => {
  const defaultValues = {
    sortBy: 'expirationDate',
    sortDirection: 'desc', //
    pageNumber: 1, //
    pageSize: 10, //
    skip: 0, //
  };

  if (query.sortBy) {
    defaultValues.sortBy = query.sortBy;
  }

  if (query.sortDirection && query.sortDirection === 'asc') {
    defaultValues.sortDirection = query.sortDirection;
  }

  if (query.pageNumber && query.pageNumber > 0) {
    defaultValues.pageNumber = +query.pageNumber;
  }

  if (query.pageSize && query.pageSize > 0) {
    defaultValues.pageSize = +query.pageSize;
  }

  defaultValues.skip = (defaultValues.pageNumber - 1) * defaultValues.pageSize;
  return defaultValues;
};
