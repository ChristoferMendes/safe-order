import {
  View, Text, FlatList, Image, HStack,
} from 'native-base';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import type { ICart } from '../../store/modules/cart/typescript/interfaces';

export function ShoppingCart() {
  const cart = useSelector<RootState, ICart>((state) => state.cart);
  return (
    <View>
      <FlatList
        data={cart.products}
        renderItem={({ item }) => (
          <HStack>
            <Image source={{ uri: item.image }} size={120} alt="" />
            <Text>{item.quantityRequested}</Text>
          </HStack>
        )}
      />
    </View>
  );
}
