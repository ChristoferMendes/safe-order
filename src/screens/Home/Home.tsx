import {
  View, Text, ScrollView,
} from 'native-base';
import { Filters } from '../../components/Filters';
import { Header } from '../../components/Header';
import { ImageScroller } from '../../components/ImageScroller';
import { ProductsList } from '../../components/ProductsList';

export function Home() {
  return (
    <ScrollView horizontal={false}>
      <Header />
      <View>
        <View pt={5} pl={8}>
          <Text fontWeight="bold" fontSize="xl">Order the best ones!</Text>
        </View>
        <ImageScroller />
        <Filters />
        <ProductsList />
      </View>
    </ScrollView>
  );
}
