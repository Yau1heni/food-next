import { Option } from '@components/MultiDropdown';

export const getTitle = (defaultTitle: string) => {
  return (value: Option[]): string => {
    return value.length > 0 ? value.map((v) => v.value).join(', ') : defaultTitle;
  };
};

// Предопределенные варианты для удобства
export const getCategoriesTitle = getTitle('Categories');
export const getRatingTitle = getTitle('Rating');
