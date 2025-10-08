'use client';

import { Navigation } from '@components/Navigation';
import { type FC, useEffect } from 'react';

import styles from './HeaderModal.module.scss';

type HeaderModalProps = {
  open: boolean;
  onClose: () => void;
};

export const HeaderModal: FC<HeaderModalProps> = (props) => {
  const { open, onClose } = props;

  // Блокируем скролл при открытии HeaderModal
  useEffect(() => {
    if (open) {
      document.body.classList.add(styles.noScroll);
    } else {
      document.body.classList.remove(styles.noScroll);
    }

    return () => {
      document.body.classList.remove(styles.noScroll);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <button className={styles.closeButton} onClick={onClose} aria-label="Close menu">
        &times;
      </button>
      <Navigation className={styles.navLinks} onCloseNodal={onClose} />
    </div>
  );
};
