import {
  FlatList, ScrollView, View
} from 'native-base';
import { useSelector } from 'react-redux';
import { CartProductsList } from '../../components/CartProductsList';
import { CartWithoutProducts } from '../../components/CartWithoutProducts';
import { selectCart } from '../../store/modules/cart/cartSlice';
import { ICartProduct } from '../../store/modules/cart/typescript/interfaces';

export function ShoppingCart() {
  const cart = useSelector(selectCart);
  const renderCartProductsList = ({ item }: { item: ICartProduct }) => <CartProductsList product={item} />

  return (
    <View>
      {cart.products.length ? <FlatList
        data={cart.products}
        renderItem={renderCartProductsList}
      /> : (
        <ScrollView horizontal={false}>
          <CartWithoutProducts />
        </ScrollView>
      )}
    </View>
  );
}
