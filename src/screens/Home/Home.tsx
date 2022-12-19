import { View, Text } from 'react-native';
import { Header } from '../../components/Header';
import { ImageScroller } from '../../components/ImageScroller';

export function Home() {
  return (
    <View>
      <Header />
      <View>
        <Text>Order the best ones!</Text>
      </View>
      <View>
        <ImageScroller />
      </View>
      <View />
    </View>
  );
}
