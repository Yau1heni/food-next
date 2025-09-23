import cn from 'classnames';
import Text from '@components/Text';
import { type FC } from 'react';

import styles from './Navigation.module.scss';
import { navigationConfig } from './navigationConfig';
import Link from 'next/link';

export type NavigationProps = {
  className?: string;
};

export const Navigation: FC<NavigationProps> = ({ className }) => {
  /*const { pathname, search } = useLocation();*/

  const finallyClassName = cn(styles.navigation, className);

  const navList = navigationConfig.map(({ title, to }, i) => (
    <Link href={to} key={i} /*state={{ from: pathname + search }}*/>
      <Text /*color={pathname === to ? 'accent' : 'primary'} */ view={'p-16'}>{title}</Text>
    </Link>
  ));

  return <nav className={finallyClassName}>{navList}</nav>;
};
