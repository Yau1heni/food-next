import { PAGINATION_LIMIT } from '@/store/models';

export type UsePaginationProps = {
  total: number; // всего страниц
  page: number; // текущая страница
  limit?: number; // текущая страница
};

export type UsePaginationResult = (number | '...')[];

const createRange = (start: number, end: number): number[] => {
  const res: number[] = [];
  for (let i = start; i <= end; i++) res.push(i);
  return res;
};

export const usePagination = ({
  total,
  page,
  limit = PAGINATION_LIMIT,
}: UsePaginationProps): UsePaginationResult => {
  const pageCount = Math.ceil(total / Math.max(limit, 1));

  if (pageCount <= 5) return createRange(1, pageCount);

  const pages: (number | '...')[] = [];

  // Всегда показываем первую страницу
  pages.push(1);

  if (page <= 4) {
    // начало
    pages.push(...createRange(2, 5));
    pages.push('...');
  } else if (page >= pageCount - 3) {
    // конец
    pages.push('...');
    pages.push(...createRange(pageCount - 4, pageCount - 1));
  } else {
    // середина
    pages.push('...');
    pages.push(page - 1, page, page + 1);
    pages.push('...');
  }

  // Всегда показываем последнюю страницу
  pages.push(pageCount);

  return pages;
};
