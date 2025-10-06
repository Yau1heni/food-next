import { ProfileStoreInitData } from '@/store/ProfileStore';

const LOCAL_KEY = 'profile';

export const safeRead = (): ProfileStoreInitData => {
  if (typeof window === 'undefined') return {};

  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as ProfileStoreInitData;
  } catch {
    return {};
  }
};

export const safeWrite = (data: ProfileStoreInitData) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
};
