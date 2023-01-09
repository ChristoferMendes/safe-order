import { View, FlatList, ScrollView } from 'native-base';
import { TouchableWithoutFeedback } from 'react-native';
import { IProduct, StateProduct } from '../../store/modules/products/typescript';
import { ProductBox } from '../ProductBox';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export function ProductsList() {
  const { products } = useSelector<RootState, StateProduct>(state => state.product)

  const renderItem = ({ item: product }: { item: IProduct }) => (
    <View mb={10}>
      <ProductBox product={product} />
    </View>
  );

  return (
    <View mt="12">
      <ScrollView horizontal>
        <TouchableWithoutFeedback>
          <FlatList
            data={products}
            renderItem={renderItem}
            height={600}
            nestedScrollEnabled
          />
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
}
