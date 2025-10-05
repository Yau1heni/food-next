import { Nullable } from '@/store/models';

export type StrapiBase = {
  id: number;
  documentId: string;
};

export type MetaApi = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

export type StrapiImage = StrapiBase & {
  url: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: FormatImage;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  previewUrl: string;
  provider: string;
};

type ImageSize = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: Nullable<string>;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
};

type FormatImage = Record<'small' | 'medium' | 'thumbnail', ImageSize>;

export type ApiResponse<T> = {
  data: T;
  meta: MetaApi;
};
