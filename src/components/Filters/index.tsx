import { Button, FlatList } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { selectProductFilter, setFilter } from '../../store/modules/productFilter/productFilterSlice';
import { CategoryEnum } from '../../store/modules/products/typescript/enum';
import { FilterButton } from '../FilterButton';

export function Filters({ loading }: { loading: boolean }) {
  const filters = Object.values(CategoryEnum);
  const dispatch = useDispatch();
  const { filter } = useSelector(selectProductFilter)

  const handleSetCurrentFilter = (filter: CategoryEnum | null) => {
    dispatch(setFilter(filter))
  }

  const cleanFilter = () => {
    dispatch(setFilter(null))
  }

  const renderItem = ({ item, index }: { item: CategoryEnum, index: number }) => {
    const cleanFilterButtonConditions = index === 0 && filter
    return (
      <>
        {cleanFilterButtonConditions && (
          <Button
            mx="2"
            bgColor={'blue.500'}
            onPress={cleanFilter}
            _pressed={{
              bgColor: 'green.300'
            }}
          >
            Clean filter
          </Button>
        )}
        <FilterButton item={item} handleSetCurrentFilter={handleSetCurrentFilter} />
      </>
    )
  };


  return (
    <>
      {!loading &&
        <FlatList
          data={filters}
          renderItem={renderItem}
          horizontal
          mx="auto"
          mt="5"
        />
      }
    </>
  );
}
