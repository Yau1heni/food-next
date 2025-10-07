import { ProfileStoreInitData } from '@/store/ProfileStore';
import { profileDataInit } from '@/store/models';

const LOCAL_KEY = 'profile';

export const safeRead = (): ProfileStoreInitData => {
  if (typeof window === 'undefined') return profileDataInit;

  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return profileDataInit;
    return JSON.parse(raw) as ProfileStoreInitData;
  } catch {
    return profileDataInit;
  }
};

export const safeWrite = (data: ProfileStoreInitData) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
};
