import { useMemo, useState } from 'react';
import { PAGINATION_LIMIT } from '@/store/models';

type UseClientPaginationProps<T> = {
  data: T[];
  limit?: number;
};
export type UseClientPaginationResult<T> = {
  page: number;
  setPage: (page: number) => void;
  total: number;
  pageCount: number;
  paginatedData: T[];
};

export const useClientPagination = <T>({
  data,
  limit = PAGINATION_LIMIT,
}: UseClientPaginationProps<T>): UseClientPaginationResult<T> => {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(data.length / Math.max(limit, 1));

  const paginatedData = useMemo(() => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return data.slice(start, end);
  }, [data, page, limit]);

  return {
    page,
    setPage,
    pageCount,
    paginatedData,
    total: data.length,
  };
};
