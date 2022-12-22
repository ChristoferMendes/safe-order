import { View, FlatList, ScrollView } from 'native-base';
import { useEffect } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useDispatch } from 'react-redux';
import { storeProductInfo } from '../../store/modules/products/actions';
import { ProductBox } from '../ProductBox';
import { IProduct } from './types';

export function ProductsList() {
  const images = [
    { uuid: '1', image: 'https://gayafood.com.br/wp-content/uploads/2020/08/slide-2.png' },
    { uuid: '2', image: 'https://files.elfsightcdn.com/cc6568d0-b075-4862-b2e7-a58eb1373ff8/896b447d-ace1-4036-a0a7-4c29bb14d255.png' },
    { uuid: '3', image: 'https://prod-dairyqueen.dotcmscloud.com/dA/49251d31c2/fileAsset/2-for-5-super-snack-CA.png' },
  ] as IProduct[];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(storeProductInfo(images));
  }, []);

  const renderItem = ({ item }: { item: IProduct }) => (
    <View mb={10}>
      <TouchableWithoutFeedback>
        <ProductBox item={item} />
      </TouchableWithoutFeedback>
    </View>
  );

  return (
    <View mt="12">
      <ScrollView horizontal>
        <TouchableWithoutFeedback>
          <FlatList
            data={images}
            renderItem={renderItem}
            height={600}
            nestedScrollEnabled
          />
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
}
