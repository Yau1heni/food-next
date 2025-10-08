import { Container } from '@components/Container';
import { PageTitle } from '@components/PageTitle';
import { Profile } from './components/Profile';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Food profile',
  description: 'Application profile',
};

const Page = () => {
  return (
    <Container>
      <PageTitle title="Profile" />
      <Profile />
    </Container>
  );
};

export default Page;
