import { useCallback, useMemo, useState } from 'react';

export type UseInfiniteScrollResult<T> = {
  visibleData: T[];
  hasMore: boolean;
  loadMore: () => void;
  reset: () => void;
};

export const INFINITE_SCROLL_LIMIT = 6;

export const useInfiniteScroll = <T>(
  data: T[],
  limit: number = INFINITE_SCROLL_LIMIT
): UseInfiniteScrollResult<T> => {
  const [visibleCount, setVisibleCount] = useState(limit);

  const loadMore = useCallback(
    () => setVisibleCount((prev) => Math.min(prev + limit, data.length)),
    [data.length, limit]
  );
  const reset = useCallback(() => setVisibleCount(limit), [limit]);
  const hasMore = visibleCount < data.length;

  const visibleData = useMemo(() => data.slice(0, visibleCount), [data, visibleCount]);

  return { visibleData, hasMore, loadMore, reset };
};
