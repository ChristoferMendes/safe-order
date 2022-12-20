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
    'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
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
          <SliderDot item={item} scrollX={scrollX} index={idx} />
        ))}
      </View>
    </View>
  );
}
