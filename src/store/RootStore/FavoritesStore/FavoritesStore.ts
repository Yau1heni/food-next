import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { CollectionModel, Favorites, Nullable, Statuses } from '@/store/models';
import { Meta } from '@utils/meta';
import RootStore from '@/store/RootStore';
import { favoritesApi } from '@api/favoritesApi';

export type FavoritesPageStoreInitData = {
  data: Favorites[];
  meta: Meta;
};

type PrivateFields = '_list' | '_loadingById' | '_errorMessage' | '_meta';

export default class FavoritesStore {
  private _rootStore: RootStore;

  private _list = new CollectionModel<number, Favorites>();

  private _statuses: Map<number, Statuses> = new Map();
  private _activeRequests: number = 0;
  private _limit: number = 5;

  private _meta: Meta = Meta.initial;
  private _loadingById: Record<number, boolean> = {};
  private _errorMessage: Nullable<string> = null;

  constructor(rootStore: RootStore, init?: FavoritesPageStoreInitData) {
    this._rootStore = rootStore;

    if (init) {
      this._list.normalize(init.data, (listItem) => listItem.originalRecipeId);
      this._meta = init.meta;
    }

    makeObservable<FavoritesStore, PrivateFields>(this, {
      _list: observable.ref,
      _loadingById: observable,
      _meta: observable,
      _errorMessage: observable,

      list: computed,
      loadingById: computed,
      meta: computed,
      isLimitReached: computed,

      getInitData: action,
      removeFavorite: action,
      addFavorite: action,
    });
  }

  get list(): Favorites[] {
    return this._list.linearize;
  }

  get loadingById() {
    return this._loadingById;
  }

  get meta() {
    return this._meta;
  }

  setLoading(id: number, value: boolean) {
    this.loadingById[id] = value;
  }

  get isLimitReached() {
    return this._activeRequests >= this._limit;
  }

  getStatus(productId: number) {
    return this._statuses.get(productId) ?? 'idle';
  }

  get errorMessage(): Nullable<string> {
    return this._errorMessage;
  }

  async getInitData(): Promise<void> {
    const res = await favoritesApi.getFavorites();

    runInAction(() => {
      this._list.normalize(res, (listItem) => listItem.originalRecipeId);
      this._meta = Meta.success;
    });
  }

  serialize(): FavoritesPageStoreInitData {
    return { data: this.list, meta: Meta.success };
  }

  async removeFavorite(id: number) {
    this.setLoading(id, true);

    // Если лимит достигнут — блокируем
    if (this.isLimitReached) {
      this._statuses.set(id, Statuses.blocked);
      alert('block'); // думаю добавить Toaster, в котором выведу сообщение (не успел оформить)
      return;
    }

    // Если товар уже в процессе — игнорируем
    if (this.getStatus(id) === Statuses.loading) return;
    this._statuses.set(id, Statuses.loading);
    this._activeRequests++;

    this.setLoading(id, true);

    const res = await favoritesApi.removeFavorite({ recipe: id });

    if (res.ok) {
      runInAction(() => {
        this._list.remove(id);
        this._meta = Meta.success;
        this.setLoading(id, false);

        this._statuses.set(id, Statuses.added);
      });
    } else {
      this._meta = Meta.error;
      this._list.reset();
      this.setLoading(id, false);
      this._statuses.set(id, Statuses.error);
      this._activeRequests--;
    }
  }

  async addFavorite(id: number) {
    // Если лимит достигнут — блокируем
    if (this.isLimitReached) {
      this._statuses.set(id, Statuses.blocked);
      alert('block'); // думаю добавить Toaster, в котором выведу сообщение (не успел оформить)
      return;
    }

    // Если товар уже в процессе — игнорируем
    if (this.getStatus(id) === Statuses.loading) return;
    this._statuses.set(id, Statuses.loading);
    this._activeRequests++;

    this.setLoading(id, true);

    const res = await favoritesApi.addFavorite({ recipe: id });

    try {
      runInAction(() => {
        this._list.add(res, (listItem) => listItem.originalRecipeId);
        this._meta = Meta.success;
        this.setLoading(id, false);

        this._statuses.set(id, Statuses.added);
      });
    } catch (err) {
      this._errorMessage = err instanceof Error ? err.message : String(err);
      this._meta = Meta.error;
      this._list.reset();
      this.setLoading(id, false);

      this._statuses.set(id, Statuses.error);
    } finally {
      this._activeRequests--;
    }
  }

  checkAvailability(id: number) {
    if (this.meta === Meta.success) {
      return this._list.has(id);
    }
  }
}
