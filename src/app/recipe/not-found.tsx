import Link from 'next/link';
import { Error } from '@components/Error/Error';
import { routes } from '@config/routes';

export default function NotFound() {
  return (
    <div>
      <Error title={'Not Found'} descriptions={'Could not find requested resource'}>
        <Link href={routes.main.mask}>Return Home</Link>
      </Error>
    </div>
  );
}
