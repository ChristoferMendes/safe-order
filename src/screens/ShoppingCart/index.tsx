import {
  View, Text, FlatList, Image, HStack, VStack,
} from 'native-base';
import { useSelector } from 'react-redux';
import { useCurrencyConverted } from '../../hooks/useCurrencyConverter/useCurrencyConverter';
import { selectCart } from '../../store/modules/cart/cartSlice';

export function ShoppingCart() {
  const cart = useSelector(selectCart);
  const currencyConverter = useCurrencyConverted();

  return (
    <View>
      <FlatList
        data={cart.products}
        renderItem={({ item }) => (
          <HStack>
            <Image source={{ uri: item.image }} size={120} alt="" />
            <VStack my="auto">
              <Text>{item.description}</Text>
              <Text>{currencyConverter(item.price * item.quantityRequested)}</Text>
            </VStack>
          </HStack>
        )}  
      />
    </View>
  );
}
