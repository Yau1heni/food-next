import { Container } from '@components/Container';
import { PageTitle } from '@components/PageTitle';
import { FavoritesList } from './components/FavoritesList';

const Page = async () => {
  return (
    <Container>
      <PageTitle title={'Favorites'} />
      <FavoritesList />
    </Container>
  );
};

export default Page;
