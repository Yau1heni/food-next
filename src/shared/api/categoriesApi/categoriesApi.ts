import { apiFetch, CACHE_LIFETIME_IN_SECONDS } from '@utils/apiFetch';
import { CategoryApi } from '@/store/models';
import { ApiUrls } from '@config/apiUrls';

export const categoriesApi = {
  async getCategories(): Promise<CategoryApi[]> {
    const res = await apiFetch(ApiUrls.categories.getCategoriesUrl(), {
      next: { revalidate: CACHE_LIFETIME_IN_SECONDS },
    });
    return res.data;
  },
};
