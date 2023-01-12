import { View, FlatList } from 'native-base';
import { useRef } from 'react';
import {
  Animated, NativeScrollEvent, NativeSyntheticEvent,
} from 'react-native';
import { useSelector } from 'react-redux';
import { selectProduct } from '../../store/modules/products/productSlice';
import { IProduct } from '../../store/modules/products/typescript';
import { Carousel } from '../Carousel';
import { SliderDot } from '../SliderDot';

export function ImageScroller() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { products } = useSelector(selectProduct)

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

  const renderItem = ({ item }: { item: IProduct }) => <Carousel item={item} />;


  const firstThreeProducts = products?.slice(0, 3)
  return (
    <View>
      <FlatList
        data={firstThreeProducts}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
      />
      <View display="flex" flexDir="row" justifyContent="center" mt={2}>
        {firstThreeProducts?.map((item, idx) => (
          <SliderDot item={item} scrollX={scrollX} index={idx} key={item.uuid} />
        ))}
      </View>
    </View>
  );
}
