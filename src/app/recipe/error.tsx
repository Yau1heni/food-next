'use client';

import Button from '@components/Button';
import { Error } from '@components/Error';

type RecipeErrorProps = {
  reset: () => void;
  error: Error & { digest?: string };
};

export default function RecipeError({ reset, error }: RecipeErrorProps) {
  return (
    <Error title={'Something went wrong!'} descriptions={error.message || 'error occurred'}>
      <Button onClick={() => reset()}>Try again</Button>
    </Error>
  );
}
