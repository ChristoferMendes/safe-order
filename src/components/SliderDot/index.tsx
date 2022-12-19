import { Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

interface ISliderDot {
  scrollX: Animated.Value
  item: string,
  index: number
}

export function SliderDot({ item, scrollX, index }: ISliderDot) {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const dotWidth = scrollX.interpolate({
    inputRange,
    outputRange: [12, 30, 12],
    extrapolate: 'clamp',
  });
  return (
    <Animated.View
      key={item}
      style={{
        height: 12,
        width: dotWidth,
        borderRadius: 12,
        backgroundColor: '#000',
        marginLeft: 12,
      }}
    />
  );
}
