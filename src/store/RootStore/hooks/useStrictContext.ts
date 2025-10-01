import { Context, useContext } from 'react';
import { Nullable } from '@/store/models';

type UseStrictContextParams<T> = {
  context: Context<Nullable<T>>;
  message?: string;
};

export const useStrictContext = <T>({
  context,
  message = 'useStrictContext missing provider',
}: UseStrictContextParams<T>): T => {
  const value = useContext(context);

  if (value === null) {
    throw new Error(message);
  }
  return value;
};
