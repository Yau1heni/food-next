export const ApiUrls = {
  recipes: {
    getRecipesUrl: (queryString: string) => `/recipes?${queryString}`,
    getRecipeUrl: (queryString: string, id: string) => `/recipes/${id}?${queryString}`,
  },
  favorites: {
    getFavoritesUrl: () => '/favorites',
    addFavoriteUrl: () => '/favorites/add',
    removeFavoriteUrl: () => '/favorites/remove',
  },
  categories: {
    getCategoriesUrl: () => '/meal-categories',
  },
};
