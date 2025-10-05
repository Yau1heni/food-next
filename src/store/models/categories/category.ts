import { Option } from '@components/MultiDropdown';
import { StrapiBase } from '@api/types';

export type CategoryApi = StrapiBase & {
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type CategoryModel = {
  key: string;
  value: string;
};

export const normalizeCategory = (from: CategoryApi): CategoryModel => ({
  key: String(from.id),
  value: from.title,
});

export const getCategoryKeys = (value: Option[]) => {
  return value.length > 0 ? value.map((v) => v.key).join(', ') : '';
};
