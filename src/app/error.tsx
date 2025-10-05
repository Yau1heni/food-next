'use client';

import Button from '@components/Button';
import { Error } from '@components/Error/Error';

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <Error title={'Something went wrong!'} descriptions={'A global error occurred'}>
      <Button onClick={() => reset()}>Try again</Button>
    </Error>
  );
}
