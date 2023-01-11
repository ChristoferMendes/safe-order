import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {
  FlatList, ScrollView, View
} from 'native-base';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { CartProductsList } from '../../components/CartProductsList';
import { CartWithoutProducts } from '../../components/CartWithoutProducts';
import { CartCheckout } from '../../components/CartCheckout';
import { selectCart } from '../../store/modules/cart/cartSlice';
import { ICartProduct } from '../../store/modules/cart/typescript/interfaces';


const { height } = Dimensions.get('window')

export function ShoppingCart() {
  const cart = useSelector(selectCart);
  const renderCartProductsList = ({ item }: { item: ICartProduct }) => <CartProductsList product={item} />
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View>
      {cart.products.length ? (
        <View  h={height - tabBarHeight} position={'relative'}>
          <FlatList
            data={cart.products}
            renderItem={renderCartProductsList}
            height={430}
            flexGrow={0}
          />
          <CartCheckout />
        </View>
      ) : (
        <ScrollView horizontal={false}>
          <CartWithoutProducts />
        </ScrollView>
      )}
    </View>
  );
}
