import { FlatList } from 'native-base';
import { FilterButton } from '../FilterButton';

export function Filters() {
  const filters = ['Salads', 'Pizzas', 'Snack', 'Hamburguer'];

  const renderItem = ({ item }: { item: string }) => (
    <FilterButton item={item} />
  );
  return (
    <FlatList
      data={filters}
      renderItem={renderItem}
      horizontal
      mx="auto"
      mt="5"
    />
  );
}
