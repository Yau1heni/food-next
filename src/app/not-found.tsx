import Link from 'next/link';
import { routes } from '@config/routes';
import { Error } from '@components/Error/Error';

export default function NotFound() {
  return (
    <Error title={'Not Found'} descriptions={'Could not find requested resource'}>
      <Link href={routes.main.mask}>Return Home</Link>
    </Error>
  );
}
