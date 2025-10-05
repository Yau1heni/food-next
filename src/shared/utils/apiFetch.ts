const baseURL = 'https://front-school-strapi.ktsdev.ru/api';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzU4NDI0OTQwLCJleHAiOjE3NjEwMTY5NDB9.wc2qDmt18-zgrK0Z7A5A0Fqjifc9XjqcdaVpfDW8WzU';
export const CACHE_LIFETIME_IN_SECONDS = 300;

export async function apiFetch(
  endpoint: string,
  options: RequestInit & { next?: NextFetchRequestConfig } = {}
) {
  const res = await fetch(`${baseURL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
    next: options.next,
  });

  if (!res.ok) {
    throw new Error(`Fetch error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
