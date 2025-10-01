import { apiFetch } from '@utils/apiFetch';
import { CategoryApi } from '@/store/models';

export const categoriesApi = {
  async getCategories(): Promise<CategoryApi[]> {
    const res = await apiFetch('/meal-categories');
    return res.data;
  },
};
