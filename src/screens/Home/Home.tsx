import { View, Text } from 'native-base';
import { Header } from '../../components/Header';
import { ImageScroller } from '../../components/ImageScroller';
import { ProductsList } from '../../components/ProductsList';

export function Home() {
  return (
    <View>
      <Header />
      <View pt={5} pl={8}>
        <Text fontWeight="bold" fontSize="xl">Order the best ones!</Text>
      </View>
      <View>
        <ImageScroller />
      </View>
      <View>
        <Text>Filters</Text>
      </View>
      <ProductsList />
    </View>
  );
}
