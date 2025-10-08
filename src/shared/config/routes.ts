export const routes = {
  main: {
    mask: '/',
    create: () => '/',
  },
  recipe: {
    mask: '/recipe/:id',
    create: (id: string) => `/recipe/${id}`,
  },
  favorites: {
    mask: '/favorites',
    create: () => '/favorites',
  },
  profile: {
    mask: '/profile',
    create: () => '/profile',
  },
};
