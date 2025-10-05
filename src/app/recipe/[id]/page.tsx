import { FC } from 'react';
import { RecipePageStoreContextProvider } from '@/store/RecipeStore/RecipePageStoreProvider';
import { RecipePage } from '@/app/recipe/[id]/RecipePage';
import RecipeStore from '@/store/RecipeStore';

type FavoritePageProps = {
  params: Promise<{ id: string }>;
};

const Page: FC<FavoritePageProps> = async (props) => {
  const { id } = await props.params;

  const initData = await RecipeStore.getInitData(id);

  return (
    <RecipePageStoreContextProvider initData={initData}>
      <RecipePage />
    </RecipePageStoreContextProvider>
  );
};

export default Page;
