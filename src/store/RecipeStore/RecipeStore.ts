import { action, computed, makeObservable, observable } from 'mobx';
import { Nullable, Recipe } from '@/store/models';
import { Meta } from '@utils/meta';
import { recipesApi } from '@api/recipesApi';

export type RecipePageStoreInitData = {
  data: Recipe;
};

type PrivateFields = '_currentRecipe' | '_meta';

export default class RecipeStore {
  private _currentRecipe: Nullable<Recipe> = null;
  private _meta: Meta = Meta.initial;

  constructor(init?: RecipePageStoreInitData) {
    if (init) {
      this._currentRecipe = init.data;
    }

    makeObservable<RecipeStore, PrivateFields>(this, {
      _currentRecipe: observable,
      _meta: observable,

      currentRecipe: computed,
      meta: computed,

      reset: action,
      destroy: action,
    });
  }

  get currentRecipe(): Nullable<Recipe> {
    return this._currentRecipe;
  }

  get meta(): Meta {
    return this._meta;
  }

  static async getInitData(id: string): Promise<RecipePageStoreInitData> {
    const response = await recipesApi.getRecipe(id);
    return { data: response };
  }

  static fromJson(data: RecipePageStoreInitData) {
    return new RecipeStore(data);
  }

  reset(): void {
    this._currentRecipe = null;
    this._meta = Meta.initial;
  }

  destroy(): void {
    this.reset();
  }
}
