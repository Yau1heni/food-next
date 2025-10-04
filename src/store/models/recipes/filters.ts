import { CategoryModel } from '@/store/models';

export type FiltersModel = {
  name: string;
  categories: CategoryModel[];
};

export const getInitialFiltersModel = (): FiltersModel => ({
  name: '',
  categories: [],
});
