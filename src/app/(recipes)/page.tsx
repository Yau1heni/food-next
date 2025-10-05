import RecipesStore, { RecipesPageStoreContextProvider } from '@/store/RecipesStore';
import CategoriesStore from '@/store/CategoriesStore';
import styles from './RecipesPage.module.scss';
import { RecipesPage } from './RecipesPage';
import Image from 'next/image';

const Page = async (props: { searchParams: Promise<Record<string, string>> }) => {
  const searchParams = await props.searchParams;

  const [recipe, category] = await Promise.all([
    RecipesStore.getInitData(searchParams),
    CategoriesStore.getCategories(),
  ]);

  if (!recipe || !category) throw new Error('data loading error');

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
