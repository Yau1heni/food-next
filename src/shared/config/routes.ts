export const routes = {
  main: {
    mask: '/',
    create: () => '/',
  },
  recipe: {
    mask: '/recipes/:id',
    create: (id: string) => `/recipes/${id}`,
  },
  favorites: {
    mask: '/favorites',
    create: () => '/favorites',
  },
};
