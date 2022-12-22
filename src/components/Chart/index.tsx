import { View, Text } from 'native-base';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export function Chart() {
  const { finalPrice } = useSelector<RootState, any>((state) => state.actionSheetButton);
  return (
    <View>
      <Text>{finalPrice}</Text>
    </View>
  );
}
