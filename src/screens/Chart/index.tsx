import { View, Text } from 'native-base';
import { useSelector } from 'react-redux';
import { IProduct } from '../../components/ProductsList/types';
import { RootState } from '../../store';
import type { IChart } from '../../store/modules/chart/interfaces';

export function Chart() {
  const chart = useSelector<RootState, IChart>((state) => state.chart);
  // console.log('CHART: ', products);
  return (
    <View>
      {chart?.products.map((item) => (
        <Text key={item.uuid}>
          Price:
          {' '}
          {item.quantity}
        </Text>
      ))}
    </View>
  );
}
