import {
  View, Text, FlatList, Image, HStack, VStack, ScrollView,
} from 'native-base';
import { useSelector } from 'react-redux';
import { CartWithoutProducts } from '../../components/CartWithoutProducts';
import { useCurrencyConverted } from '../../hooks/useCurrencyConverter/useCurrencyConverter';
import { selectCart } from '../../store/modules/cart/cartSlice';

export function ShoppingCart() {
  const cart = useSelector(selectCart);
  const currencyConverter = useCurrencyConverted();

  return (
    <>
      {cart.products.length ? <FlatList
        data={cart.products}
        renderItem={({ item }) => (
          <HStack>
            <Image source={{ uri: item.image_url }} size={120} alt="" />
            <VStack my="auto">
              <Text>{item.description}</Text>
              <Text>{currencyConverter(item.price * item.quantityRequested)}</Text>
            </VStack>
          </HStack>
        )}
      /> : (
        <ScrollView horizontal={false}>
          <CartWithoutProducts />
        </ScrollView>
      )}
    </>
  );
}
