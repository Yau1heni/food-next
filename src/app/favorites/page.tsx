import { Container } from '@components/Container';
import { PageTitle } from '@components/PageTitle';
import { FavoritesList } from './components/FavoritesList';

const Page = () => {
  return (
    <Container>
      <PageTitle title={'Favorites'} />
      <FavoritesList />
    </Container>
  );
};

export default Page;
