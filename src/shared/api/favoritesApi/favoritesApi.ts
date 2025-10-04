import { Favorites } from '@/store/models';
import { apiFetch } from '@utils/apiFetch';
import { ApiUrls } from '@config/apiUrls';

export const favoritesApi = {
  async getFavorites(): Promise<Favorites[]> {
    return await apiFetch(ApiUrls.favorites.getFavoritesUrl());
  },

  async addFavorite(data: { recipe: number }): Promise<Favorites> {
    return await apiFetch(ApiUrls.favorites.addFavoriteUrl(), {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async removeFavorite(data: { recipe: number }): Promise<{ ok: boolean }> {
    return await apiFetch(ApiUrls.favorites.removeFavoriteUrl(), {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
