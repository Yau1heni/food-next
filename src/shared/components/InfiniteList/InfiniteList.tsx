import { Virtuoso } from 'react-virtuoso';
import { INFINITE_SCROLL_LIMIT, useInfiniteScroll } from '@hooks/useInfiniteScroll';
import { toast } from 'react-toastify';
import { ReactNode } from 'react';

export type InfiniteScrollListProps<T> = {
  items: T[];
  children: (item: T, index: number) => ReactNode;
  limit?: number;
};

export const InfiniteScrollList = <T,>(props: InfiniteScrollListProps<T>) => {
  const { items, limit = INFINITE_SCROLL_LIMIT, children } = props;
  const { visibleData, hasMore, loadMore } = useInfiniteScroll(items, limit);

  return (
    <Virtuoso
      style={{ height: 'calc(100vh - 250px)' }}
      data={visibleData}
      overscan={200}
      itemContent={(index, item) => (
        <div key={index}>
          {children(item, index)}
        </div>
      )}
      endReached={() => {
        if (hasMore) {
          loadMore();
        } else {
          toast.info('All data loaded');
        }
      }}
    />
  );
};
