import { FC, PropsWithChildren } from 'react';
import styles from './Error.module.scss';
import { Container } from '@components/Container';
import Text from '@components/Text';

type ErrorProps = {
  title: string;
  descriptions: string;
} & PropsWithChildren;

export const Error: FC<ErrorProps> = ({ children, descriptions, title }) => {
  return (
    <div className={styles.error}>
      <Container>
        <div className={styles.errorContainer}>
          <Text tag={'h2'} weight={'bold'} view={'p-20'}>
            {title}
          </Text>
          <Text>{descriptions}</Text>
          {children}
        </div>
      </Container>
    </div>
  );
};
