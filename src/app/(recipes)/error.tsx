'use client';

import Button from '@components/Button';
import { Error } from '@components/Error/Error';

type RecipesErrorProps = {
  reset: () => void;
  error: Error & { digest?: string };
};

export default function RecipesError({ reset, error }: RecipesErrorProps) {
  return (
    <Error title={'Something went wrong!'} descriptions={error.message || 'error occurred'}>
      <Button onClick={() => reset()}>Try again</Button>
    </Error>
  );
}
