import { View, FlatList } from 'native-base';
import { useRef } from 'react';
import {
  Animated, NativeScrollEvent, NativeSyntheticEvent,
} from 'react-native';
import { Carousel } from '../Carousel';
import { SliderDot } from '../SliderDot';

export function ImageScroller() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const images = [
    'https://gayafood.com.br/wp-content/uploads/2020/08/slide-2.png',
    'https://prod-dairyqueen.dotcmscloud.com/dA/5fc4b39d2e/fileAsset/BaconTwoCheeseDuo.png',
    'https://files.elfsightcdn.com/cc6568d0-b075-4862-b2e7-a58eb1373ff8/896b447d-ace1-4036-a0a7-4c29bb14d255.png',
    'https://prod-dairyqueen.dotcmscloud.com/dA/49251d31c2/fileAsset/2-for-5-super-snack-CA.png',
  ];

  const handleOnScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    Animated.event([{
      nativeEvent: {
        contentOffset: {
          x: scrollX,
        },
      },
    }], {
      useNativeDriver: false,
    })(e);
  };

  const renderItem = ({ item }: { item: string}) => <Carousel item={item} />;

  return (
    <View>
      <FlatList
        data={images}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
      />
      <View display="flex" flexDir="row" justifyContent="center" mt={2}>
        {images.map((item, idx) => (
          <SliderDot item={item} scrollX={scrollX} index={idx} key={item} />
        ))}
      </View>
    </View>
  );
}
