import { View, FlatList, ScrollView } from 'native-base';
import { ProductBox } from '../ProductBox';

export function ProductsList() {
  const images = [
    'https://gayafood.com.br/wp-content/uploads/2020/08/slide-2.png',
    'https://prod-dairyqueen.dotcmscloud.com/dA/5fc4b39d2e/fileAsset/BaconTwoCheeseDuo.png',
    'https://files.elfsightcdn.com/cc6568d0-b075-4862-b2e7-a58eb1373ff8/896b447d-ace1-4036-a0a7-4c29bb14d255.png',
    'https://prod-dairyqueen.dotcmscloud.com/dA/49251d31c2/fileAsset/2-for-5-super-snack-CA.png',
    'https://prod-dairyqueen.dotcmscloud.com/dA/49251d31c2/fileAsset/2-for-5-super-snack-CA.png',
    'https://prod-dairyqueen.dotcmscloud.com/dA/49251d31c2/fileAsset/2-for-5-super-snack-CA.png',
    'https://prod-dairyqueen.dotcmscloud.com/dA/49251d31c2/fileAsset/2-for-5-super-snack-CA.png',
    'https://prod-dairyqueen.dotcmscloud.com/dA/49251d31c2/fileAsset/2-for-5-super-snack-CA.png',
    'https://prod-dairyqueen.dotcmscloud.com/dA/49251d31c2/fileAsset/2-for-5-super-snack-CA.png',
  ];

  const renderItem = ({ item }: { item: string }) => (
    <View mb={10}>
      <ProductBox item={item} />
    </View>
  );

  return (
    <View mt="12">
      <ScrollView horizontal>
        <FlatList
          data={images}
          renderItem={renderItem}
          height={600}
          nestedScrollEnabled
        />
      </ScrollView>
    </View>
  );
}
