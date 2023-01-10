import {
  FlatList, ScrollView, HStack
} from 'native-base';
import { useSelector } from 'react-redux';
import { CartWithoutProducts } from '../../components/CartWithoutProducts';
import { ProductBox } from '../../components/ProductBox';
import { selectCart } from '../../store/modules/cart/cartSlice';

export function ShoppingCart() {
  const cart = useSelector(selectCart);

  return (
    <>
      {cart.products.length ? <FlatList
        data={cart.products}
        renderItem={({ item: product }) => (
          <HStack>
            <ProductBox product={product} />
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
