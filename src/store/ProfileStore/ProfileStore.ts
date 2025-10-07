import { makeAutoObservable, runInAction } from 'mobx';
import { toast } from 'react-toastify';
import { safeRead, safeWrite } from '@utils/localStorage';
import { profileDataInit } from '@/store/models';

export type ProfileStoreInitData = {
  name: string;
  email: string;
  password: string;
  avatarId: number | undefined;
  avatarUrl: string | undefined;
};

export default class ProfileStore {
  profileData: ProfileStoreInitData = profileDataInit;

  draftName = '';
  draftEmail = '';
  draftPassword = '';
  draftAvatarId: number | undefined = undefined;
  draftAvatarUrl: string | undefined = undefined;
  isHydrated = false;

  editableFields: string[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    if (typeof window !== 'undefined') {
      this.hydrateFromLocalStorage();
    }
  }

  get canSave() {
    return Boolean(
      (this.draftName.trim() || this.draftEmail.trim() || this.draftPassword.trim()) &&
        this.editableFields.length === 0
    );
  }

  setName(value: string) {
    this.draftName = value;
  }

  setEmail(value: string) {
    this.draftEmail = value;
  }

  setPassword(value: string) {
    this.draftPassword = value;
  }

  setEditMode(value: string) {
    this.editableFields.push(value);
  }

  isEdit(value: string) {
    return !!this.editableFields.find((el) => el === value);
  }

  removeEdit(value: string) {
    this.editableFields = this.editableFields.filter((el) => el !== value);
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
        this.draftAvatarId = undefined;
        this.draftAvatarUrl = dataUrl;
      });
    } catch (e: unknown) {
      runInAction(() => {
        toast.error(e instanceof Error ? e.message : 'Upload failed');
      });
    }
  }

  saveProfileData() {
    this.profileData = {
      name: this.draftName,
      email: this.draftEmail,
      password: this.draftPassword,
      avatarId: this.draftAvatarId,
      avatarUrl: this.draftAvatarUrl,
    };
  }

  save() {
    safeWrite({
      name: this.draftName,
      email: this.draftEmail,
      password: this.draftPassword,
      avatarId: this.draftAvatarId,
      avatarUrl: this.draftAvatarUrl,
    });

    this.saveProfileData();

    toast.success('Profile saved');
  }

  hydrateFromLocalStorage() {
    const data = safeRead();

    this.profileData = {
      name: data.name || this.draftName,
      email: data.email || this.draftEmail,
      password: data.password || this.draftPassword,
      avatarId: data.avatarId ?? this.draftAvatarId,
      avatarUrl: data.avatarUrl ?? this.draftAvatarUrl,
    };

    this.draftName = data.name || this.draftName;
    this.draftEmail = data.email || this.draftEmail;
    this.draftPassword = data.password || this.draftPassword;
    this.draftAvatarId = data.avatarId ?? this.draftAvatarId;
    this.draftAvatarUrl = data.avatarUrl ?? this.draftAvatarUrl;

    this.isHydrated = true;
  }
}
