import { Text, Button } from 'native-base';
import { useSelector } from 'react-redux';
import { selectProductFilter } from '../../store/modules/productFilter/productFilterSlice';
import { IFilterButton } from './IFilterButton';

export function FilterButton({ item, handleSetCurrentFilter }: IFilterButton ) {
  const { filter } = useSelector(selectProductFilter)
  const isCurrentFilter = filter === item;

  const setFilter = () => {
    if (isCurrentFilter) {
      handleSetCurrentFilter(null)
      return;
    }
    handleSetCurrentFilter(item)
  }

  const defineBackgroundColor = isCurrentFilter ? 'red.400' : 'gray.200'
  return (
    <Button mr="2" bgColor={defineBackgroundColor} _pressed={{ bgColor: 'gray.300' }} onPress={setFilter} rounded="lg">
      <Text>{item}</Text>
    </Button>
  );
}
