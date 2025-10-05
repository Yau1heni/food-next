export const PAGINATION_LIMIT = 9;
export const START_PAGE = 1;

export type PaginationModel = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export const getInitialPaginationModel = (): PaginationModel => ({
  page: START_PAGE,
  pageSize: 9,
  pageCount: 0,
  total: 0,
});
