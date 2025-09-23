'use client';
import { observer } from 'mobx-react-lite';
import { use } from 'react';

type FavoritePageProps = {
  params: Promise<{ id: string }>;
};

const RecipePage = ({ params }: FavoritePageProps) => {
  const { id } = use(params);

  return <div>RecipePage {id}</div>;
};

export default observer(RecipePage);
