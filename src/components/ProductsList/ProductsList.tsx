import { View, FlatList, ScrollView } from 'native-base';
import { useEffect } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useDispatch } from 'react-redux';
import { storeProductInfo } from '../../store/modules/products/actions';
import { IProduct } from '../../store/modules/products/typescript';
import { ProductBox } from '../ProductBox';

export function ProductsList() {
  const products = [
    { uuid: '1', image: 'https://gayafood.com.br/wp-content/uploads/2020/08/slide-2.png', price: 33 },
    { uuid: '2', image: 'https://files.elfsightcdn.com/cc6568d0-b075-4862-b2e7-a58eb1373ff8/896b447d-ace1-4036-a0a7-4c29bb14d255.png', price: 22 },
    { uuid: '3', image: 'https://prod-dairyqueen.dotcmscloud.com/dA/49251d31c2/fileAsset/2-for-5-super-snack-CA.png', price: 22 },
  ] as IProduct[];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(storeProductInfo(products));
  }, []);

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
