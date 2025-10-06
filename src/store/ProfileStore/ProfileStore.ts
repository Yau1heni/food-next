import { makeAutoObservable, runInAction } from 'mobx';
import { toast } from 'react-toastify';
import { safeRead, safeWrite } from '@utils/localStorage';

export type ProfileStoreInitData = {
  name?: string;
  email?: string;
  password?: string;
  avatarId?: number;
  avatarUrl?: string;
};

export default class ProfileStore {
  name = '';
  email = '';
  password = '';
  avatarId: number | undefined = undefined;
  avatarUrl: string | undefined = undefined;
  isHydrated = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    if (typeof window !== 'undefined') {
      this.hydrateFromLocalStorage();
    }
  }

  get canSave() {
    return Boolean(this.name.trim() || this.email.trim() || this.password.trim());
  }

  setName(value: string) {
    this.name = value;
  }

  setEmail(value: string) {
    this.email = value;
  }

  setPassword(value: string) {
    this.password = value;
  }

  async upload(file: File) {
    const MAX_BYTES = 200 * 1024; // 200KB limit to avoid localStorage overflow
    if (file.size > MAX_BYTES) {
      toast.error('File is too large. Max size is 200KB.');
      return;
    }

    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
      });

      runInAction(() => {
        this.avatarId = undefined;
        this.avatarUrl = dataUrl;
      });
    } catch (e: unknown) {
      runInAction(() => {
        toast.error(e instanceof Error ? e.message : 'Upload failed');
      });
    }
  }

  save() {
    safeWrite({
      name: this.name,
      email: this.email,
      password: this.password,
      avatarId: this.avatarId,
      avatarUrl: this.avatarUrl,
    });
    toast.success('Profile saved');
  }

  hydrateFromLocalStorage() {
    const data = safeRead();

    this.name = data.name || this.name;
    this.email = data.email || this.email;
    this.password = data.password || this.password;
    this.avatarId = data.avatarId ?? this.avatarId;
    this.avatarUrl = data.avatarUrl ?? this.avatarUrl;

    this.isHydrated = true;
  }
}
