import {
  Box, Image, ScrollView, View, Text, Button, HStack, FlatList,
} from 'native-base';
import { useRef, useState } from 'react';
import {
  Animated, Dimensions, NativeScrollEvent, NativeSyntheticEvent, ViewToken,
} from 'react-native';
import { Carousel } from '../Carousel';
import { SliderDot } from '../SliderDot';

const { width, height } = Dimensions.get('window');

export function ImageScroller() {
  const [index, setIndex] = useState<number | null>(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const images = [
    'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
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

  const handleOnViewableItemsChanged = useRef((info: { viewableItems: ViewToken[]}) => {
    const { viewableItems } = info;
    setIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View>
      <FlatList
        data={images}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <View display="flex" flexDir="row" justifyContent="center" mt={2}>
        {images.map((item, idx) => (
          <SliderDot item={item} scrollX={scrollX} index={idx} />
        ))}
      </View>
    </View>
  );
}
