import { View, FlatList } from 'native-base';
import { useRef } from 'react';
import {
  Animated, NativeScrollEvent, NativeSyntheticEvent,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useCurrencyConverted } from '../../hooks/useCurrencyConverter/useCurrencyConverter';
import { RootState } from '../../store';
import { IProduct, StateProduct } from '../../store/modules/products/typescript';
import { Carousel } from '../Carousel';
import { SliderDot } from '../SliderDot';

export function ImageScroller() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { products } = useSelector<RootState, StateProduct>(state => state.product)

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

  return (
    <View>
      <FlatList
        data={products}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
      />
      <View display="flex" flexDir="row" justifyContent="center" mt={2}>
        {products?.map((item, idx) => (
          <SliderDot item={item} scrollX={scrollX} index={idx} key={item.uuid} />
        ))}
      </View>
    </View>
  );
}
