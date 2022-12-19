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

  const backGroundColor = scrollX.interpolate({
    inputRange,
    outputRange: ['#ccc', '#000', '#ccc'],
    extrapolate: 'clamp',
  });
  return (
    <Animated.View
      key={item}
      style={{
        height: 12,
        width: dotWidth,
        borderRadius: 12,
        backgroundColor: backGroundColor,
        marginLeft: 12,
      }}
    />
  );
}
