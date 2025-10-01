import { Favorites } from '@/store/models';
import { apiFetch } from '@utils/apiFetch';

export const favoritesApi = {
  async getFavorites(): Promise<Favorites[]> {
    return await apiFetch('/favorites');
  },

  async addFavorite(data: { recipe: number }): Promise<Favorites> {
    return await apiFetch('/favorites/add', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async removeFavorite(data: { recipe: number }): Promise<{ ok: boolean }> {
    return await apiFetch('/favorites/remove', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
