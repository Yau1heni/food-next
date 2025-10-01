'use client';

import { reaction } from 'mobx';
import { useEffect, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRootStore } from '@/store/RootStore/hooks';

export const useQueryParamsStoreInit = (): void => {
  const rootStore = useRootStore();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = useMemo(() => searchParams?.toString() || '', [searchParams]);

  // 1. Инициализация из URL
  useEffect(() => {
    rootStore.query.setSearch(search);
  }, [search]);

  useEffect(() => {
    const dispose = reaction(
      () => rootStore.query.searchString,
      (newSearch) => {
        if (search !== newSearch) {
          // Проблема: при выборе фильтра скролится вверх, { scroll: false } не срабатывает почему-то...
          router.replace(`${pathname}${newSearch}`, { scroll: false });
        }
      }
    );

    return () => dispose();
  }, [pathname, router, search]);
};
