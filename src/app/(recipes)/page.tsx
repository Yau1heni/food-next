import RecipesStore, { RecipesPageStoreContextProvider } from '@/store/RecipesStore';
import CategoriesStore from '@/store/CategoriesStore';
import styles from './RecipesPage.module.scss';
import { RecipesPage } from './RecipesPage';
import { getCategoryKeys } from '@/store/models';
import Image from 'next/image';

const Page = async (props: { searchParams: Promise<Record<string, string>> }) => {
  const searchParams = await props.searchParams;

  const recipe = await RecipesStore.getInitData({
    term: searchParams.searchTerm ?? '',
    page: Number(searchParams.page ?? 1),
    categories: searchParams.category ? getCategoryKeys(JSON.parse(searchParams.category)) : '',
    isVegetarian: searchParams.isVegetarian === 'true',
  });

  const category = await CategoriesStore.getCategories();

  return (
    <RecipesPageStoreContextProvider initData={{ recipe, category }}>
      <section className={styles.bannerImage}>
        <Image src={'/images/banner.webp'} alt={'banner'} width={720} height={286} />
      </section>
      <RecipesPage />
    </RecipesPageStoreContextProvider>
  );
};

export default Page;
