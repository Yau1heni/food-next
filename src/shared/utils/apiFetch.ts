/*const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const token = process.env.NEXT_PUBLIC_API_TOKEN;*/

const baseURL = 'https://front-school-strapi.ktsdev.ru/api';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzU4NDI0OTQwLCJleHAiOjE3NjEwMTY5NDB9.wc2qDmt18-zgrK0Z7A5A0Fqjifc9XjqcdaVpfDW8WzU';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${baseURL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error(`Fetch error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
