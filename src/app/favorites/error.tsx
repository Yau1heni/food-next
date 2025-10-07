'use client';

import Button from '@components/Button';
import { Error } from '@components/Error';

type FavoritesErrorProps = {
  reset: () => void;
  error: Error & { digest?: string };
};

export default function FavoritesError({ reset, error }: FavoritesErrorProps) {
  return (
    <Error title={'Something went wrong!'} descriptions={error.message || 'error occurred'}>
      <Button onClick={() => reset()}>Try again</Button>
    </Error>
  );
}
