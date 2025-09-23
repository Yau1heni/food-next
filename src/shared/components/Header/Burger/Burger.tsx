import { type FC } from 'react';

import styles from './Burger.module.scss';

type BurgerProps = {
  onOpen: () => void;
};

export const Burger: FC<BurgerProps> = ({ onOpen }) => {
  return (
    <button className={styles.menuButton} onClick={onOpen} aria-label="Open menu">
      &#9776;
    </button>
  );
};
