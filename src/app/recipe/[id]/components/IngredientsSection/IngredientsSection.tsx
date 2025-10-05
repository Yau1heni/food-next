import { EquipmentItem } from '../EquipmentItem';
import { IngredientItem } from '../IngredientItem/';
import { List } from '@components/List';
import { type FC } from 'react';

import styles from './IngredientsSection.module.scss';
import { Equipments, Ingredient } from '@/store/models';

type IngredientsSectionProps = {
  ingredients?: Ingredient[];
  equipments: Equipments[];
};

export const IngredientsSection: FC<IngredientsSectionProps> = ({ ingredients, equipments }) => {
  if (!ingredients) return null;

  const renderIngredients = ingredients.map((ingredient) => (
    <IngredientItem
      key={ingredient.id}
      name={ingredient.name}
      amount={ingredient.amount}
      unit={ingredient.unit}
    />
  ));

  const renderEquipment = equipments.map(({ name, id }) => <EquipmentItem key={id} name={name} />);

  return (
    <section className={styles.ingredientsSection}>
      <List title={'Ingredients'}>{renderIngredients}</List>
      <div className={styles.line} />
      <List title={'Equipment'}>{renderEquipment}</List>
    </section>
  );
};
