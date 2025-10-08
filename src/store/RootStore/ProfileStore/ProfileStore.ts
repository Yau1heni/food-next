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
  private _profileData: ProfileStoreInitData = profileDataInit;
  private _profileDraftData: ProfileStoreInitData = profileDataInit;
  private _editableFields: Set<string> = new Set();
  private _isHydrated = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    if (typeof window !== 'undefined') {
      this.hydrateFromLocalStorage();
    }
  }

  get profileData() {
    return this._profileData;
  }

  get profileDraftData() {
    return this._profileDraftData;
  }

  get isHydrated() {
    return this._isHydrated;
  }

  get canSave() {
    const { name, email, password } = this._profileDraftData;
    return Boolean(
      name.trim() && email.trim() && password.trim() && this._editableFields.size === 0
    );
  }

  setField<K extends keyof ProfileStoreInitData>(key: K, value: ProfileStoreInitData[K]) {
    this._profileDraftData[key] = value;
  }

  setEditMode(field: keyof ProfileStoreInitData) {
    this._editableFields.add(field);
  }

  isEdit(field: keyof ProfileStoreInitData) {
    return this._editableFields.has(field);
  }

  removeEdit(field: keyof ProfileStoreInitData) {
    this._editableFields.delete(field);
  }

  async upload(file: File) {
    const MAX_BYTES = 200 * 1024; // 200KB
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
        this._profileDraftData.avatarId = undefined;
        this._profileDraftData.avatarUrl = dataUrl;
      });
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Upload failed');
    }
  }

  save() {
    this._profileData = this._profileDraftData;
    safeWrite(this._profileDraftData);

    toast.success('Profile saved');
  }

  hydrateFromLocalStorage() {
    const data = safeRead();

    this._profileData = data;
    this._profileDraftData = data;

    this._isHydrated = true;
  }
}
